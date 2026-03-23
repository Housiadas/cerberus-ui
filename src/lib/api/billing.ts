// Billing API client functions.
// Each function maps to a billing endpoint from the OpenAPI spec.

import type {
  CheckoutRequest,
  CheckoutResponse,
  InvoiceResponse,
  PortalRequest,
  PortalResponse,
  SubscriptionResponse,
} from "@/types/billing";

import { API_BASE, buildHeaders, handleResponse } from "./client";

/** POST /api/v1/billing/checkout - Create a Stripe Checkout session */
export const createCheckoutSession = async (data: CheckoutRequest, token: string): Promise<CheckoutResponse> => {
  const response = await fetch(`${API_BASE}/api/v1/billing/checkout`, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<CheckoutResponse>(response);
};

/** POST /api/v1/billing/portal - Create a Stripe Customer Portal session */
export const createPortalSession = async (data: PortalRequest, token: string): Promise<PortalResponse> => {
  const response = await fetch(`${API_BASE}/api/v1/billing/portal`, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<PortalResponse>(response);
};

/** GET /api/v1/billing/subscriptions?account_id=... - List subscriptions for an account */
export const listSubscriptions = async (accountId: string, token: string): Promise<SubscriptionResponse[]> => {
  const response = await fetch(`${API_BASE}/api/v1/billing/subscriptions?account_id=${accountId}`, {
    method: "GET",
    headers: buildHeaders(token),
  });
  return handleResponse<SubscriptionResponse[]>(response);
};

/** GET /api/v1/billing/invoices?account_id=... - List invoices for an account */
export const listInvoices = async (accountId: string, token: string): Promise<InvoiceResponse[]> => {
  const response = await fetch(`${API_BASE}/api/v1/billing/invoices?account_id=${accountId}`, {
    method: "GET",
    headers: buildHeaders(token),
  });
  return handleResponse<InvoiceResponse[]>(response);
};
