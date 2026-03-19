import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { createStore, type StoreApi, useStore } from "zustand";

import { AuthGuard } from "@/components/auth/AuthGuard";
import type { AuthState } from "@/types/rbac";

const mockReplace = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: mockReplace,
    push: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

const createTestAuthStore = (overrides: Partial<AuthState> = {}): StoreApi<AuthState> =>
  createStore<AuthState>()((_set) => ({
    accessToken: null,
    refreshToken: null,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    setTokens: () => {
      /* noop */
    },
    clearSession: () => {
      /* noop */
    },
    setLoading: () => {
      /* noop */
    },
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

const authenticatedUser = {
  id: "user-1",
  name: "Test",
  email: "test@test.com",
  roles: ["admin"],
  permissions: ["users:read", "dashboard:access"],
};

describe("AuthGuard", () => {
  it("shows loading spinner when auth is loading", () => {
    setMockStore(createTestAuthStore({ isLoading: true }));

    const { container } = render(
      <AuthGuard>
        <div>Protected</div>
      </AuthGuard>,
    );

    expect(screen.queryByText("Protected")).toBeNull();
    expect(container.querySelector(".animate-spin")).toBeTruthy();
  });

  it("redirects to login when not authenticated", () => {
    mockReplace.mockClear();
    setMockStore(createTestAuthStore({ isLoading: false, isAuthenticated: false }));

    render(
      <AuthGuard>
        <div>Protected</div>
      </AuthGuard>,
    );

    expect(screen.queryByText("Protected")).toBeNull();
    expect(mockReplace).toHaveBeenCalledWith("/login");
  });

  it("renders children when authenticated with no permission requirements", () => {
    setMockStore(
      createTestAuthStore({
        isLoading: false,
        isAuthenticated: true,
        user: authenticatedUser,
      }),
    );

    render(
      <AuthGuard>
        <div>Protected</div>
      </AuthGuard>,
    );

    expect(screen.getByText("Protected")).toBeTruthy();
  });

  it("redirects to unauthorized when missing required permission", () => {
    mockReplace.mockClear();
    setMockStore(
      createTestAuthStore({
        isLoading: false,
        isAuthenticated: true,
        user: authenticatedUser,
      }),
    );

    render(
      <AuthGuard permission="finance:write">
        <div>Protected</div>
      </AuthGuard>,
    );

    expect(screen.queryByText("Protected")).toBeNull();
    expect(mockReplace).toHaveBeenCalledWith("/unauthorized");
  });

  it("renders children when user has the required permission", () => {
    setMockStore(
      createTestAuthStore({
        isLoading: false,
        isAuthenticated: true,
        user: authenticatedUser,
      }),
    );

    render(
      <AuthGuard permission="users:read">
        <div>Protected</div>
      </AuthGuard>,
    );

    expect(screen.getByText("Protected")).toBeTruthy();
  });

  it("redirects when user lacks required role", () => {
    mockReplace.mockClear();
    setMockStore(
      createTestAuthStore({
        isLoading: false,
        isAuthenticated: true,
        user: authenticatedUser,
      }),
    );

    render(
      <AuthGuard roles={["superadmin"]}>
        <div>Protected</div>
      </AuthGuard>,
    );

    expect(screen.queryByText("Protected")).toBeNull();
    expect(mockReplace).toHaveBeenCalledWith("/unauthorized");
  });

  it("uses custom unauthorized redirect", () => {
    mockReplace.mockClear();
    setMockStore(
      createTestAuthStore({
        isLoading: false,
        isAuthenticated: true,
        user: authenticatedUser,
      }),
    );

    render(
      <AuthGuard permission="nope" unauthorizedRedirect="/custom-denied">
        <div>Protected</div>
      </AuthGuard>,
    );

    expect(mockReplace).toHaveBeenCalledWith("/custom-denied");
  });
});
