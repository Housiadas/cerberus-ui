import { z } from "zod";

import { metadataSchema } from "@/types/users";

// ---- Account Schema ----

/** Account response schema */
export const accountSchema = z.object({
  id: z.string(),
  name: z.string(),
  stripeCustomerId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Account = z.infer<typeof accountSchema>;

// ---- Account Page Result ----

/** Paginated account list response schema */
export const accountPageResultSchema = z.object({
  data: z.array(accountSchema),
  metadata: metadataSchema,
});

export type AccountPageResult = z.infer<typeof accountPageResultSchema>;

// ---- Query Parameters ----

/** Parameters for listing/searching accounts */
export const listAccountsParamsSchema = z.object({
  cursor: z.string().optional(),
  limit: z.string().optional(),
  orderBy: z.string().optional(),
  account_id: z.string().optional(),
  name: z.string().optional(),
});

export type ListAccountsParams = z.infer<typeof listAccountsParamsSchema>;

// ---- Create Account ----

/** Create account request schema */
export const newAccountSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type NewAccount = z.infer<typeof newAccountSchema>;

// ---- Update Account ----

/** Update account request schema */
export const updateAccountSchema = z.object({
  name: z.string().optional(),
});

export type UpdateAccount = z.infer<typeof updateAccountSchema>;
