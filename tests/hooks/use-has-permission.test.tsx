import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { createStore, type StoreApi, useStore } from "zustand";

import {
  useHasAllPermissions,
  useHasAnyPermission,
  useHasAnyRole,
  useHasPermission,
  useHasRole,
} from "@/hooks/use-has-permission";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const user = {
  id: "user-1",
  name: "Test",
  email: "test@test.com",
  roles: ["admin", "editor"],
  permissions: ["users:read", "users:write", "posts:read"],
};

describe("useHasPermission", () => {
  it("returns true when user has the permission", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user }));
    const { result } = renderHook(() => useHasPermission("users:read"));
    expect(result.current).toBe(true);
  });

  it("returns false when user lacks the permission", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user }));
    const { result } = renderHook(() => useHasPermission("finance:write"));
    expect(result.current).toBe(false);
  });

  it("returns false when no user", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: false, user: null }));
    const { result } = renderHook(() => useHasPermission("users:read"));
    expect(result.current).toBe(false);
  });
});

describe("useHasAllPermissions", () => {
  it("returns true when user has all permissions", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user }));
    const { result } = renderHook(() => useHasAllPermissions(["users:read", "users:write"]));
    expect(result.current).toBe(true);
  });

  it("returns false when user lacks one permission", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user }));
    const { result } = renderHook(() => useHasAllPermissions(["users:read", "finance:write"]));
    expect(result.current).toBe(false);
  });
});

describe("useHasAnyPermission", () => {
  it("returns true when user has at least one permission", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user }));
    const { result } = renderHook(() => useHasAnyPermission(["finance:write", "users:read"]));
    expect(result.current).toBe(true);
  });

  it("returns false when user has none of the permissions", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user }));
    const { result } = renderHook(() => useHasAnyPermission(["finance:write", "billing:read"]));
    expect(result.current).toBe(false);
  });
});

describe("useHasRole", () => {
  it("returns true when user has the role", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user }));
    const { result } = renderHook(() => useHasRole("admin"));
    expect(result.current).toBe(true);
  });

  it("returns false when user lacks the role", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user }));
    const { result } = renderHook(() => useHasRole("superadmin"));
    expect(result.current).toBe(false);
  });
});

describe("useHasAnyRole", () => {
  it("returns true when user has at least one role", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user }));
    const { result } = renderHook(() => useHasAnyRole(["superadmin", "editor"]));
    expect(result.current).toBe(true);
  });

  it("returns false when user has none of the roles", () => {
    setMockStore(createTestAuthStore({ isAuthenticated: true, user }));
    const { result } = renderHook(() => useHasAnyRole(["superadmin", "viewer"]));
    expect(result.current).toBe(false);
  });
});
