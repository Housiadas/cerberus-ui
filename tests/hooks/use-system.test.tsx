import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { useLiveness, useReadiness } from "@/hooks/use-system";

const API_BASE = "http://localhost:4000";

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

describe("useReadiness", () => {
  it("returns readiness status", async () => {
    server.use(http.get(`${API_BASE}/readiness`, () => HttpResponse.json({ status: "ok" })));

    const { result } = renderHook(() => useReadiness(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ status: "ok" });
  });
});

describe("useLiveness", () => {
  it("returns liveness info", async () => {
    const mockInfo = {
      status: "ok",
      build: "v1.0.0",
      host: "host-1",
      name: "cerberus",
      podIp: "10.0.0.1",
      node: "node-1",
      namespace: "default",
      gomaxprocs: 4,
    };
    server.use(http.get(`${API_BASE}/liveness`, () => HttpResponse.json(mockInfo)));

    const { result } = renderHook(() => useLiveness(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ status: "ok", name: "cerberus" });
  });
});
