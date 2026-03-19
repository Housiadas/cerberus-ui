import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import {
  useAddUserRole,
  useCreateUser,
  useDeleteUser,
  useListUsers,
  useMe,
  useRemoveUserRole,
  useUpdateMe,
  useUpdateUser,
  useUser,
} from "@/hooks/use-users";

const API_BASE = "http://localhost:4000";
const TOKEN = "test-access-token";

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

const mockUser = {
  id: "user-1",
  name: "Test User",
  email: "test@example.com",
  department: "Engineering",
  enabled: true,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

describe("useMe", () => {
  it("returns current user profile", async () => {
    server.use(http.get(`${API_BASE}/api/v1/users/me`, () => HttpResponse.json(mockUser)));

    const { result } = renderHook(() => useMe(TOKEN), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ id: "user-1" });
  });
});

describe("useUpdateMe", () => {
  it("updates current user profile", async () => {
    const updated = { ...mockUser, name: "Updated Name" };
    server.use(http.put(`${API_BASE}/api/v1/users/me`, () => HttpResponse.json(updated)));

    const { result } = renderHook(() => useUpdateMe(TOKEN), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ name: "Updated Name" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ name: "Updated Name" });
  });
});

describe("useListUsers", () => {
  it("returns paginated user list", async () => {
    const mockResponse = {
      data: [mockUser],
      metadata: { hasMore: false, limit: 10 },
    };
    server.use(http.get(`${API_BASE}/api/v1/users`, () => HttpResponse.json(mockResponse)));

    const { result } = renderHook(() => useListUsers({}, TOKEN), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data).toHaveLength(1);
    expect(result.current.data?.metadata.hasMore).toBe(false);
  });
});

describe("useUser", () => {
  it("returns a single user by ID", async () => {
    server.use(http.get(`${API_BASE}/api/v1/users/user-1`, () => HttpResponse.json(mockUser)));

    const { result } = renderHook(() => useUser("user-1", TOKEN), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ id: "user-1" });
  });
});

describe("useCreateUser", () => {
  it("creates a new user", async () => {
    server.use(http.post(`${API_BASE}/api/v1/users`, () => HttpResponse.json(mockUser)));

    const { result } = renderHook(() => useCreateUser(TOKEN), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      passwordConfirm: "password123",
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ id: "user-1" });
  });
});

describe("useUpdateUser", () => {
  it("updates an existing user", async () => {
    const updated = { ...mockUser, name: "Admin Updated" };
    server.use(http.put(`${API_BASE}/api/v1/users/user-1`, () => HttpResponse.json(updated)));

    const { result } = renderHook(() => useUpdateUser(TOKEN), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ userId: "user-1", data: { name: "Admin Updated" } });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ name: "Admin Updated" });
  });
});

describe("useDeleteUser", () => {
  it("deletes a user", async () => {
    server.use(http.delete(`${API_BASE}/api/v1/users/user-1`, () => new HttpResponse(null, { status: 204 })));

    const { result } = renderHook(() => useDeleteUser(TOKEN), {
      wrapper: createWrapper(),
    });

    result.current.mutate("user-1");

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});

describe("useAddUserRole", () => {
  it("adds a role to a user", async () => {
    server.use(http.post(`${API_BASE}/api/v1/users/user-1/role`, () => new HttpResponse(null, { status: 204 })));

    const { result } = renderHook(() => useAddUserRole(TOKEN), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ userId: "user-1", data: { role_id: "role-admin" } });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});

describe("useRemoveUserRole", () => {
  it("removes a role from a user", async () => {
    server.use(http.delete(`${API_BASE}/api/v1/users/user-1/role`, () => new HttpResponse(null, { status: 204 })));

    const { result } = renderHook(() => useRemoveUserRole(TOKEN), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ userId: "user-1", roleId: "role-admin" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
