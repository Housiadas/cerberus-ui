import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { createStore, type StoreApi, useStore } from "zustand";

import { PermissionGate } from "@/components/auth/PermissionGate";
import type { AuthState } from "@/types/rbac";

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
  roles: ["admin", "editor"],
  permissions: ["users:read", "users:write", "posts:read"],
};

describe("PermissionGate", () => {
  it("renders children when user has the required permission", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user: authenticatedUser }));

    render(
      <PermissionGate permission="users:read">
        <div>Protected Content</div>
      </PermissionGate>,
    );

    expect(screen.getByText("Protected Content")).toBeTruthy();
  });

  it("hides children when user lacks the required permission", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user: authenticatedUser }));

    render(
      <PermissionGate permission="finance:write">
        <div>Protected Content</div>
      </PermissionGate>,
    );

    expect(screen.queryByText("Protected Content")).toBeNull();
  });

  it("renders fallback when user lacks permission", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user: authenticatedUser }));

    render(
      <PermissionGate permission="finance:write" fallback={<div>No Access</div>}>
        <div>Protected Content</div>
      </PermissionGate>,
    );

    expect(screen.getByText("No Access")).toBeTruthy();
    expect(screen.queryByText("Protected Content")).toBeNull();
  });

  it("renders children when user has any of the required permissions", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user: authenticatedUser }));

    render(
      <PermissionGate permissions={["finance:write", "users:read"]}>
        <div>Protected Content</div>
      </PermissionGate>,
    );

    expect(screen.getByText("Protected Content")).toBeTruthy();
  });

  it("hides children when requireAll is true and user lacks some permissions", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user: authenticatedUser }));

    render(
      <PermissionGate permissions={["users:read", "finance:write"]} requireAll>
        <div>Protected Content</div>
      </PermissionGate>,
    );

    expect(screen.queryByText("Protected Content")).toBeNull();
  });

  it("renders children when user has a matching role", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user: authenticatedUser }));

    render(
      <PermissionGate roles={["admin"]}>
        <div>Admin Content</div>
      </PermissionGate>,
    );

    expect(screen.getByText("Admin Content")).toBeTruthy();
  });

  it("hides children when user lacks matching role", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user: authenticatedUser }));

    render(
      <PermissionGate roles={["superadmin"]}>
        <div>Admin Content</div>
      </PermissionGate>,
    );

    expect(screen.queryByText("Admin Content")).toBeNull();
  });

  it("hides children when user is not authenticated", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: false, user: null }));

    render(
      <PermissionGate permission="users:read">
        <div>Protected Content</div>
      </PermissionGate>,
    );

    expect(screen.queryByText("Protected Content")).toBeNull();
  });
});
