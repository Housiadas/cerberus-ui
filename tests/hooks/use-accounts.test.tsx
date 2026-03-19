import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import {
  useCreateAccount,
  useDeleteAccount,
  useGetAccount,
  useListAccounts,
  useUpdateAccount,
} from "@/hooks/use-accounts";

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

const mockAccount = {
  id: "acc-1",
  name: "Acme Corp",
  stripeCustomerId: "cus_123",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};

describe("useListAccounts", () => {
  it("returns paginated account list", async () => {
    server.use(
      http.get(`${API_BASE}/api/v1/accounts`, () =>
        HttpResponse.json({ data: [mockAccount], metadata: { hasMore: false, limit: 10 } }),
      ),
    );

    const { result } = renderHook(() => useListAccounts({}, TOKEN), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data).toHaveLength(1);
  });
});

describe("useGetAccount", () => {
  it("returns a single account by ID", async () => {
    server.use(http.get(`${API_BASE}/api/v1/accounts/acc-1`, () => HttpResponse.json(mockAccount)));

    const { result } = renderHook(() => useGetAccount("acc-1", TOKEN), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ id: "acc-1" });
  });
});

describe("useCreateAccount", () => {
  it("creates a new account", async () => {
    server.use(http.post(`${API_BASE}/api/v1/accounts`, () => HttpResponse.json(mockAccount)));

    const { result } = renderHook(() => useCreateAccount(), { wrapper: createWrapper() });

    result.current.mutate({ name: "Acme Corp", token: TOKEN });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ id: "acc-1" });
  });
});

describe("useUpdateAccount", () => {
  it("updates an existing account", async () => {
    const updated = { ...mockAccount, name: "Acme Inc" };
    server.use(http.put(`${API_BASE}/api/v1/accounts/acc-1`, () => HttpResponse.json(updated)));

    const { result } = renderHook(() => useUpdateAccount(), { wrapper: createWrapper() });

    result.current.mutate({ accountId: "acc-1", data: { name: "Acme Inc" }, token: TOKEN });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ name: "Acme Inc" });
  });
});

describe("useDeleteAccount", () => {
  it("deletes an account", async () => {
    server.use(http.delete(`${API_BASE}/api/v1/accounts/acc-1`, () => new HttpResponse(null, { status: 204 })));

    const { result } = renderHook(() => useDeleteAccount(), { wrapper: createWrapper() });

    result.current.mutate({ accountId: "acc-1", token: TOKEN });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
