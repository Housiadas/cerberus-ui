import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createStore, type StoreApi, useStore } from "zustand";

import { UsersTable } from "@/app/(main)/dashboard/admin/users/_components/users-table";
import type { AuthState } from "@/types/rbac";

const API_BASE = "http://localhost:4000";

const mockPush = vi.fn();
const mockReplace = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

const mockUsers = [
  {
    id: "u1",
    name: "Alice Johnson",
    email: "alice@test.com",
    department: "Engineering",
    enabled: true,
    createdAt: "2025-01-10T08:00:00Z",
    updatedAt: "2025-06-15T10:30:00Z",
  },
  {
    id: "u2",
    name: "Bob Smith",
    email: "bob@test.com",
    department: "Marketing",
    enabled: false,
    createdAt: "2025-02-14T09:00:00Z",
    updatedAt: "2025-07-01T14:00:00Z",
  },
];

const server = setupServer(
  http.get(`${API_BASE}/api/v1/users`, () =>
    HttpResponse.json({ data: mockUsers, metadata: { hasMore: false, limit: 50 } }),
  ),
  http.put(`${API_BASE}/api/v1/users/:userId`, async ({ params, request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const user = mockUsers.find((u) => u.id === params.userId);
    return HttpResponse.json({ ...user, ...body });
  }),
  http.delete(`${API_BASE}/api/v1/users/:userId`, () => new HttpResponse(null, { status: 204 })),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createTestAuthStore = (): StoreApi<AuthState> =>
  createStore<AuthState>()((_set) => ({
    accessToken: "test-token",
    refreshToken: "test-refresh",
    user: {
      id: "admin-1",
      name: "Admin",
      email: "admin@test.com",
      roles: ["admin"],
      permissions: ["users:read", "users:edit", "users:delete", "users:create"],
    },
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
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("UsersTable", () => {
  it("renders users from API", async () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <UsersTable />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("Alice Johnson")).toBeTruthy();
      expect(screen.getByText("Bob Smith")).toBeTruthy();
    });
  });

  it("shows loading state", () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <UsersTable />
      </Wrapper>,
    );

    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  it("shows empty state when no users match search", async () => {
    server.use(
      http.get(`${API_BASE}/api/v1/users`, () =>
        HttpResponse.json({ data: [], metadata: { hasMore: false, limit: 50 } }),
      ),
    );

    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <UsersTable />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("No users found.")).toBeTruthy();
    });
  });

  it("has a search input", async () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <UsersTable />
      </Wrapper>,
    );

    const searchInput = screen.getByPlaceholderText("Search name or email...");
    expect(searchInput).toBeTruthy();

    fireEvent.change(searchInput, { target: { value: "alice" } });
    expect(searchInput).toHaveProperty("value", "alice");
  });

  it("displays department and enabled status columns", async () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <UsersTable />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("Engineering")).toBeTruthy();
      expect(screen.getByText("Marketing")).toBeTruthy();
    });

    // Check column headers
    expect(screen.getByText("Name")).toBeTruthy();
    expect(screen.getByText("Email")).toBeTruthy();
    expect(screen.getByText("Department")).toBeTruthy();
    expect(screen.getByText("Enabled")).toBeTruthy();
  });
});
