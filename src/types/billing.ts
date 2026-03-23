import { z } from "zod";

// ---- Checkout ----

/** Checkout session request schema */
export const checkoutRequestSchema = z.object({
  accountId: z.string().min(1, "Account ID is required"),
  priceId: z.string().min(1, "Price ID is required"),
  successUrl: z.string().url("Must be a valid URL"),
  cancelUrl: z.string().url("Must be a valid URL"),
});

export type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;

/** Checkout session response schema */
export const checkoutResponseSchema = z.object({
  url: z.string(),
});

export type CheckoutResponse = z.infer<typeof checkoutResponseSchema>;

// ---- Portal ----

/** Portal session request schema */
export const portalRequestSchema = z.object({
  accountId: z.string().min(1, "Account ID is required"),
  returnUrl: z.string().url("Must be a valid URL"),
});

export type PortalRequest = z.infer<typeof portalRequestSchema>;

/** Portal session response schema */
export const portalResponseSchema = z.object({
  url: z.string(),
});

export type PortalResponse = z.infer<typeof portalResponseSchema>;

// ---- Subscription ----

/** Subscription response schema */
export const subscriptionResponseSchema = z.object({
  id: z.string(),
  stripeSubscriptionId: z.string(),
  stripePriceId: z.string(),
  status: z.string(),
  currentPeriodStart: z.string(),
  currentPeriodEnd: z.string(),
  cancelAtPeriodEnd: z.boolean(),
  createdAt: z.string(),
});

export type SubscriptionResponse = z.infer<typeof subscriptionResponseSchema>;

// ---- Invoice ----

/** Invoice response schema */
export const invoiceResponseSchema = z.object({
  id: z.string(),
  stripeInvoiceId: z.string(),
  status: z.string(),
  amountDue: z.number(),
  amountPaid: z.number(),
  currency: z.string(),
  invoiceUrl: z.string(),
  createdAt: z.string(),
});

export type InvoiceResponse = z.infer<typeof invoiceResponseSchema>;
