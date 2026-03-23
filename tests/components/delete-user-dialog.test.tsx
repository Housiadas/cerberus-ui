import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createStore, type StoreApi, useStore } from "zustand";

import { DeleteUserDialog } from "@/app/(main)/dashboard/admin/users/_components/delete-user-dialog";
import type { User } from "@/types/auth";
import type { AuthState } from "@/types/rbac";

const API_BASE = "http://localhost:4000";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

const server = setupServer(
  http.delete(`${API_BASE}/api/v1/users/:userId`, () => new HttpResponse(null, { status: 204 })),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createTestAuthStore = (): StoreApi<AuthState> =>
  createStore<AuthState>()((_set) => ({
    accessToken: "test-token",
    refreshToken: "test-refresh",
    user: { id: "admin-1", name: "Admin", email: "admin@test.com", roles: ["admin"], permissions: [] },
    isAuthenticated: true,
    isLoading: false,
    setTokens: vi.fn(),
    clearSession: vi.fn(),
    setLoading: vi.fn(),
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

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const testUser: User = {
  id: "u1",
  name: "Alice",
  email: "alice@test.com",
  enabled: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-01-01T00:00:00Z",
};

describe("DeleteUserDialog", () => {
  it("renders nothing when user is null", () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    const { container } = render(
      <Wrapper>
        <DeleteUserDialog user={null} onClose={vi.fn()} />
      </Wrapper>,
    );

    expect(container.querySelector("[role='alertdialog']")).toBeNull();
  });

  it("shows confirmation with user name", () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <DeleteUserDialog user={testUser} onClose={vi.fn()} />
      </Wrapper>,
    );

    expect(screen.getByText("Delete user")).toBeTruthy();
    expect(screen.getByText("Alice")).toBeTruthy();
  });

  it("calls onClose after successful deletion", async () => {
    setMockStore(createTestAuthStore());
    const onClose = vi.fn();
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <DeleteUserDialog user={testUser} onClose={onClose} />
      </Wrapper>,
    );

    fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("calls onClose when cancel is clicked", () => {
    setMockStore(createTestAuthStore());
    const onClose = vi.fn();
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <DeleteUserDialog user={testUser} onClose={onClose} />
      </Wrapper>,
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onClose).toHaveBeenCalled();
  });
});
