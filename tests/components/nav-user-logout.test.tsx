import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createStore, type StoreApi, useStore } from "zustand";

import { NavUser } from "@/app/(main)/dashboard/_components/user/nav-user";
import type { AuthState } from "@/types/rbac";

const API_BASE = "http://localhost:4000";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

vi.mock("@/lib/api/session", () => ({
  clearSession: vi.fn().mockResolvedValue(undefined),
}));

const mockClearSession = vi.fn();

const createTestAuthStore = (overrides: Partial<AuthState> = {}): StoreApi<AuthState> =>
  createStore<AuthState>()((_set) => ({
    accessToken: "access-123",
    refreshToken: "refresh-456",
    user: {
      id: "user-1",
      name: "Test User",
      email: "test@test.com",
      roles: ["admin"],
      permissions: [],
    },
    isAuthenticated: true,
    isLoading: false,
    setTokens: vi.fn(),
    clearSession: mockClearSession,
    setLoading: vi.fn(),
    ...overrides,
  }));

vi.mock("@/stores/auth/auth-provider", () => {
  let mockStore: StoreApi<AuthState> | null = null;

  return {
    setMockStore: (store: StoreApi<AuthState>) => {
      mockStore = store;
    },
    useAuthStore: <T,>(selector: (state: AuthState) => T): T => {
      if (!mockStore) throw new Error("No mock store set");
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useStore(mockStore, selector);
    },
  };
});

const { setMockStore } = (await import("@/stores/auth/auth-provider")) as unknown as {
  setMockStore: (store: StoreApi<AuthState>) => void;
};

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  mockPush.mockClear();
  mockClearSession.mockClear();
});
afterAll(() => server.close());

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("NavUser Logout", () => {
  it("renders avatar with user initials", () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <NavUser />
      </Wrapper>,
    );

    // Verify the user initials are shown in the avatar
    expect(screen.getByText("TU")).toBeTruthy();
  });

  it("returns null when no user", () => {
    setMockStore(createTestAuthStore({ user: null }));
    const Wrapper = createWrapper();

    const { container } = render(
      <Wrapper>
        <NavUser />
      </Wrapper>,
    );

    expect(container.innerHTML).toBe("");
  });

  it("calls clearSession on logout click", async () => {
    server.use(http.post(`${API_BASE}/api/v1/auth/logout`, () => new HttpResponse(null, { status: 204 })));

    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <NavUser />
      </Wrapper>,
    );

    // Click the trigger (the span with aria-haspopup)
    const trigger = screen.getByText("TU").closest("[data-slot='dropdown-menu-trigger']");
    expect(trigger).toBeTruthy();
    fireEvent.pointerDown(trigger as Element, { button: 0, pointerType: "mouse" });

    // Wait for dropdown to open
    const logoutItem = await screen.findByText("Log out");
    fireEvent.click(logoutItem);

    await waitFor(() => {
      expect(mockClearSession).toHaveBeenCalled();
    });
  });
});
