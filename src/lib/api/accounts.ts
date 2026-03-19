// Accounts API client functions.
// Each function maps to an account endpoint from the OpenAPI spec.

import type { Account, AccountPageResult, ListAccountsParams, NewAccount, UpdateAccount } from "@/types/accounts";

import { API_BASE, buildHeaders, handleResponse } from "./client";

/** GET /api/v1/accounts - List accounts with optional filters */
export const listAccounts = async (params: ListAccountsParams, token: string): Promise<AccountPageResult> => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      searchParams.set(key, value);
    }
  }
  const query = searchParams.toString();
  const url = `${API_BASE}/api/v1/accounts${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: buildHeaders(token),
  });
  return handleResponse<AccountPageResult>(response);
};

/** POST /api/v1/accounts - Create a new account */
export const createAccount = async (data: NewAccount, token: string): Promise<Account> => {
  const response = await fetch(`${API_BASE}/api/v1/accounts`, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<Account>(response);
};

/** GET /api/v1/accounts/:accountId - Get account by ID */
export const getAccount = async (accountId: string, token: string): Promise<Account> => {
  const response = await fetch(`${API_BASE}/api/v1/accounts/${accountId}`, {
    method: "GET",
    headers: buildHeaders(token),
  });
  return handleResponse<Account>(response);
};

/** PUT /api/v1/accounts/:accountId - Update an existing account */
export const updateAccount = async (accountId: string, data: UpdateAccount, token: string): Promise<Account> => {
  const response = await fetch(`${API_BASE}/api/v1/accounts/${accountId}`, {
    method: "PUT",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<Account>(response);
};

/** DELETE /api/v1/accounts/:accountId - Delete an account */
export const deleteAccount = async (accountId: string, token: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/accounts/${accountId}`, {
    method: "DELETE",
    headers: buildHeaders(token),
  });
  return handleResponse<void>(response);
};
