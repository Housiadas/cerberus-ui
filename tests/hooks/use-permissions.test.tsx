import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import {
  useCreatePermission,
  useDeletePermission,
  useListPermissions,
  useUpdatePermission,
} from "@/hooks/use-permissions";

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

const mockPermission = {
  id: "perm-1",
  name: "read:users",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

describe("useListPermissions", () => {
  it("returns paginated permission list", async () => {
    server.use(
      http.get(`${API_BASE}/api/v1/permissions`, () =>
        HttpResponse.json({ data: [mockPermission], metadata: { hasMore: false, limit: 10 } }),
      ),
    );

    const { result } = renderHook(() => useListPermissions({}, TOKEN), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data).toHaveLength(1);
  });
});

describe("useCreatePermission", () => {
  it("creates a new permission", async () => {
    server.use(http.post(`${API_BASE}/api/v1/permissions`, () => HttpResponse.json(mockPermission)));

    const { result } = renderHook(() => useCreatePermission(), { wrapper: createWrapper() });

    result.current.mutate({ name: "read:users", token: TOKEN });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ id: "perm-1" });
  });
});

describe("useUpdatePermission", () => {
  it("updates an existing permission", async () => {
    const updated = { ...mockPermission, name: "write:users" };
    server.use(http.put(`${API_BASE}/api/v1/permissions/perm-1`, () => HttpResponse.json(updated)));

    const { result } = renderHook(() => useUpdatePermission(), { wrapper: createWrapper() });

    result.current.mutate({ permissionId: "perm-1", data: { name: "write:users" }, token: TOKEN });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ name: "write:users" });
  });
});

describe("useDeletePermission", () => {
  it("deletes a permission", async () => {
    server.use(http.delete(`${API_BASE}/api/v1/permissions/perm-1`, () => new HttpResponse(null, { status: 204 })));

    const { result } = renderHook(() => useDeletePermission(), { wrapper: createWrapper() });

    result.current.mutate({ permissionId: "perm-1", token: TOKEN });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
