// React Query hooks for billing endpoints.
// Usage: import { useCreateCheckoutSession, useListSubscriptions, ... } from '@/hooks/use-billing'

import { useMutation, useQuery } from "@tanstack/react-query";

import { createCheckoutSession, createPortalSession, listInvoices, listSubscriptions } from "@/lib/api/billing";
import type { ApiError } from "@/types/auth";
import type {
  CheckoutRequest,
  CheckoutResponse,
  InvoiceResponse,
  PortalRequest,
  PortalResponse,
  SubscriptionResponse,
} from "@/types/billing";

/** Billing query key factory */
export const billingKeys = {
  all: ["billing"] as const,
  subscriptions: (accountId: string) => [...billingKeys.all, "subscriptions", accountId] as const,
  invoices: (accountId: string) => [...billingKeys.all, "invoices", accountId] as const,
};

/** Hook for creating a Stripe Checkout session */
export const useCreateCheckoutSession = () => {
  return useMutation<CheckoutResponse, ApiError, CheckoutRequest & { token: string }>({
    mutationFn: ({ token, ...data }) => createCheckoutSession(data, token),
  });
};

/** Hook for creating a Stripe Customer Portal session */
export const useCreatePortalSession = () => {
  return useMutation<PortalResponse, ApiError, PortalRequest & { token: string }>({
    mutationFn: ({ token, ...data }) => createPortalSession(data, token),
  });
};

/** Hook for listing subscriptions for an account */
export const useListSubscriptions = (accountId: string, token: string) => {
  return useQuery<SubscriptionResponse[], ApiError>({
    queryKey: billingKeys.subscriptions(accountId),
    queryFn: () => listSubscriptions(accountId, token),
    enabled: !!token && !!accountId,
  });
};

/** Hook for listing invoices for an account */
export const useListInvoices = (accountId: string, token: string) => {
  return useQuery<InvoiceResponse[], ApiError>({
    queryKey: billingKeys.invoices(accountId),
    queryFn: () => listInvoices(accountId, token),
    enabled: !!token && !!accountId,
  });
};
