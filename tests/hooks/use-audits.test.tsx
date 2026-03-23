import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { useListAudits } from "@/hooks/use-audits";

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

const mockAudit = {
  id: "audit-1",
  objId: "user-1",
  objEntity: "user",
  objName: "Test User",
  actorId: "admin-1",
  action: "create",
  data: "{}",
  message: "User created",
  timestamp: "2026-01-01T00:00:00Z",
};

describe("useListAudits", () => {
  it("returns paginated audit list", async () => {
    server.use(
      http.get(`${API_BASE}/api/v1/audits`, () =>
        HttpResponse.json({ data: [mockAudit], metadata: { hasMore: false, limit: 10 } }),
      ),
    );

    const { result } = renderHook(() => useListAudits({}, TOKEN), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.data).toHaveLength(1);
    expect(result.current.data?.data[0].action).toBe("create");
  });

  it("returns error on failure", async () => {
    server.use(
      http.get(`${API_BASE}/api/v1/audits`, () => HttpResponse.json({ message: "Forbidden" }, { status: 403 })),
    );

    const { result } = renderHook(() => useListAudits({}, TOKEN), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
