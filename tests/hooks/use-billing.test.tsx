import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import {
  useCreateCheckoutSession,
  useCreatePortalSession,
  useListInvoices,
  useListSubscriptions,
} from "@/hooks/use-billing";

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

describe("useCreateCheckoutSession", () => {
  it("creates a checkout session and returns URL", async () => {
    server.use(
      http.post(`${API_BASE}/api/v1/billing/checkout`, () =>
        HttpResponse.json({ url: "https://checkout.stripe.com/session-123" }),
      ),
    );

    const { result } = renderHook(() => useCreateCheckoutSession(), { wrapper: createWrapper() });

    result.current.mutate({
      accountId: "acc-1",
      priceId: "price_123",
      successUrl: "https://example.com/success",
      cancelUrl: "https://example.com/cancel",
      token: TOKEN,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.url).toContain("stripe.com");
  });
});

describe("useCreatePortalSession", () => {
  it("creates a portal session and returns URL", async () => {
    server.use(
      http.post(`${API_BASE}/api/v1/billing/portal`, () =>
        HttpResponse.json({ url: "https://billing.stripe.com/portal-123" }),
      ),
    );

    const { result } = renderHook(() => useCreatePortalSession(), { wrapper: createWrapper() });

    result.current.mutate({
      accountId: "acc-1",
      returnUrl: "https://example.com/dashboard",
      token: TOKEN,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.url).toContain("stripe.com");
  });
});

describe("useListSubscriptions", () => {
  it("returns subscriptions for an account", async () => {
    const mockSub = {
      id: "sub-1",
      stripeSubscriptionId: "sub_123",
      stripePriceId: "price_123",
      status: "active",
      currentPeriodStart: "2026-01-01T00:00:00Z",
      currentPeriodEnd: "2026-02-01T00:00:00Z",
      cancelAtPeriodEnd: false,
      createdAt: "2026-01-01T00:00:00Z",
    };
    server.use(http.get(`${API_BASE}/api/v1/billing/subscriptions`, () => HttpResponse.json([mockSub])));

    const { result } = renderHook(() => useListSubscriptions("acc-1", TOKEN), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].status).toBe("active");
  });
});

describe("useListInvoices", () => {
  it("returns invoices for an account", async () => {
    const mockInvoice = {
      id: "inv-1",
      stripeInvoiceId: "in_123",
      status: "paid",
      amountDue: 1000,
      amountPaid: 1000,
      currency: "usd",
      invoiceUrl: "https://pay.stripe.com/invoice/in_123",
      createdAt: "2026-01-01T00:00:00Z",
    };
    server.use(http.get(`${API_BASE}/api/v1/billing/invoices`, () => HttpResponse.json([mockInvoice])));

    const { result } = renderHook(() => useListInvoices("acc-1", TOKEN), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].status).toBe("paid");
  });
});
