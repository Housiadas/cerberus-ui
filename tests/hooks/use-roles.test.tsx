import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import {
  useAddRolePermission,
  useCreateRole,
  useDeleteRole,
  useListRoles,
  useRemoveRolePermission,
  useUpdateRole,
} from "@/hooks/use-roles";

const API_BASE = "http://localhost:4000";
const TOKEN = "test-token";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return Wrapper;
};

const mockRole = { id: "role-1", name: "admin", createdAt: "2026-01-01T00:00:00Z", updatedAt: "2026-01-01T00:00:00Z" };

describe("useListRoles", () => {
  it("returns paginated role list", async () => {
    server.use(
      http.get(`${API_BASE}/api/v1/roles`, () =>
        HttpResponse.json({ data: [mockRole], metadata: { hasMore: false, limit: 10 } }),
      ),
    );

    const { result } = renderHook(() => useListRoles({}, TOKEN), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data).toHaveLength(1);
  });
});

describe("useCreateRole", () => {
  it("creates a new role", async () => {
    server.use(http.post(`${API_BASE}/api/v1/roles`, () => HttpResponse.json(mockRole)));

    const { result } = renderHook(() => useCreateRole(), { wrapper: createWrapper() });

    result.current.mutate({ name: "admin", token: TOKEN });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ id: "role-1" });
  });
});

describe("useUpdateRole", () => {
  it("updates an existing role", async () => {
    const updated = { ...mockRole, name: "super-admin" };
    server.use(http.put(`${API_BASE}/api/v1/roles/role-1`, () => HttpResponse.json(updated)));

    const { result } = renderHook(() => useUpdateRole(), { wrapper: createWrapper() });

    result.current.mutate({ roleId: "role-1", data: { name: "super-admin" }, token: TOKEN });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ name: "super-admin" });
  });
});

describe("useDeleteRole", () => {
  it("deletes a role", async () => {
    server.use(http.delete(`${API_BASE}/api/v1/roles/role-1`, () => new HttpResponse(null, { status: 204 })));

    const { result } = renderHook(() => useDeleteRole(), { wrapper: createWrapper() });

    result.current.mutate({ roleId: "role-1", token: TOKEN });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});

describe("useAddRolePermission", () => {
  it("adds a permission to a role", async () => {
    server.use(http.post(`${API_BASE}/api/v1/roles/role-1/permission`, () => new HttpResponse(null, { status: 204 })));

    const { result } = renderHook(() => useAddRolePermission(), { wrapper: createWrapper() });

    result.current.mutate({ roleId: "role-1", data: { permission_id: "perm-1" }, token: TOKEN });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});

describe("useRemoveRolePermission", () => {
  it("removes a permission from a role", async () => {
    server.use(
      http.delete(`${API_BASE}/api/v1/roles/role-1/permission`, () => new HttpResponse(null, { status: 204 })),
    );

    const { result } = renderHook(() => useRemoveRolePermission(), { wrapper: createWrapper() });

    result.current.mutate({ roleId: "role-1", permissionId: "perm-1", token: TOKEN });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
