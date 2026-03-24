import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createStore, type StoreApi, useStore } from "zustand";

import { PermissionsMatrix } from "@/app/(main)/dashboard/admin/permissions/_components/permissions-matrix";
import type { AuthState } from "@/types/rbac";

const API_BASE = "http://localhost:4000";

const mockRoles = [
  { id: "r1", name: "admin", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "r2", name: "viewer", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
];

const mockPermissions = [
  { id: "p1", name: "users:read", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "p2", name: "users:write", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
];

// admin has both permissions, viewer has only p1
const rolePermissionsMap: Record<string, typeof mockPermissions> = {
  r1: [mockPermissions[0], mockPermissions[1]],
  r2: [mockPermissions[0]],
};

const server = setupServer(
  http.get(`${API_BASE}/api/v1/roles`, () =>
    HttpResponse.json({ data: mockRoles, metadata: { hasMore: false, limit: 50 } }),
  ),
  http.get(`${API_BASE}/api/v1/permissions`, () =>
    HttpResponse.json({ data: mockPermissions, metadata: { hasMore: false, limit: 50 } }),
  ),
  http.get(`${API_BASE}/api/v1/roles/:roleId/permissions`, ({ params }) => {
    const perms = rolePermissionsMap[params.roleId as string] ?? [];
    return HttpResponse.json(perms);
  }),
  http.post(`${API_BASE}/api/v1/roles/:roleId/permission`, () => new HttpResponse(null, { status: 204 })),
  http.delete(`${API_BASE}/api/v1/roles/:roleId/permission`, () => new HttpResponse(null, { status: 204 })),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const allPermissions = [
  "permissions:read",
  "permissions:edit",
  "roles:create",
  "roles:read",
  "roles:edit",
  "roles:delete",
];

const createTestAuthStore = (permissions = allPermissions): StoreApi<AuthState> =>
  createStore<AuthState>()((_set) => ({
    accessToken: "test-token",
    refreshToken: "test-refresh",
    user: {
      id: "admin-1",
      name: "Admin",
      email: "admin@test.com",
      roles: ["admin"],
      permissions,
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

describe("PermissionsMatrix", () => {
  it("renders matrix with roles as columns and permissions as rows", async () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <PermissionsMatrix />
      </Wrapper>,
    );

    await waitFor(() => {
      // Role column headers
      expect(screen.getByText("admin")).toBeTruthy();
      expect(screen.getByText("viewer")).toBeTruthy();
      // Permission row labels
      expect(screen.getByText("users:read")).toBeTruthy();
      expect(screen.getByText("users:write")).toBeTruthy();
    });
  });

  it("shows loading state", () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <PermissionsMatrix />
      </Wrapper>,
    );

    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  it("shows checked checkbox for assigned role-permission", async () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <PermissionsMatrix />
      </Wrapper>,
    );

    await waitFor(() => {
      // admin (r1) has users:read (p1) - should be checked
      const checkbox = screen.getByLabelText("users:read for admin");
      expect(checkbox).toBeTruthy();
      expect(checkbox.getAttribute("data-state")).toBe("checked");
    });
  });

  it("shows unchecked checkbox for unassigned role-permission", async () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <PermissionsMatrix />
      </Wrapper>,
    );

    await waitFor(() => {
      // viewer (r2) does NOT have users:write (p2) - should be unchecked
      const checkbox = screen.getByLabelText("users:write for viewer");
      expect(checkbox).toBeTruthy();
      expect(checkbox.getAttribute("data-state")).toBe("unchecked");
    });
  });

  it("toggles permission on (checkbox click triggers POST)", async () => {
    let postCalled = false;
    server.use(
      http.post(`${API_BASE}/api/v1/roles/:roleId/permission`, () => {
        postCalled = true;
        return new HttpResponse(null, { status: 204 });
      }),
    );

    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <PermissionsMatrix />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getByLabelText("users:write for viewer")).toBeTruthy();
    });

    fireEvent.click(screen.getByLabelText("users:write for viewer"));

    await waitFor(() => {
      expect(postCalled).toBe(true);
    });
  });

  it("toggles permission off (checkbox click triggers DELETE)", async () => {
    let deleteCalled = false;
    server.use(
      http.delete(`${API_BASE}/api/v1/roles/:roleId/permission`, () => {
        deleteCalled = true;
        return new HttpResponse(null, { status: 204 });
      }),
    );

    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <PermissionsMatrix />
      </Wrapper>,
    );

    await waitFor(() => {
      const checkbox = screen.getByLabelText("users:read for viewer");
      expect(checkbox.getAttribute("data-state")).toBe("checked");
    });

    fireEvent.click(screen.getByLabelText("users:read for viewer"));

    await waitFor(() => {
      expect(deleteCalled).toBe(true);
    });
  });

  it("renders 'Add Role' button", async () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <PermissionsMatrix />
      </Wrapper>,
    );

    expect(screen.getByText("Add Role")).toBeTruthy();
  });

  it("renders 'Add Permission' button", async () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <PermissionsMatrix />
      </Wrapper>,
    );

    expect(screen.getByText("Add Permission")).toBeTruthy();
  });
});
