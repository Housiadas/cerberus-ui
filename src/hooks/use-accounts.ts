// React Query hooks for account endpoints.
// Usage: import { useListAccounts, useGetAccount, ... } from '@/hooks/use-accounts'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createAccount, deleteAccount, getAccount, listAccounts, updateAccount } from "@/lib/api/accounts";
import type { Account, AccountPageResult, ListAccountsParams, NewAccount, UpdateAccount } from "@/types/accounts";
import type { ApiError } from "@/types/auth";

/** Accounts query key factory */
export const accountsKeys = {
  all: ["accounts"] as const,
  lists: () => [...accountsKeys.all, "list"] as const,
  list: (params: ListAccountsParams) => [...accountsKeys.lists(), params] as const,
  details: () => [...accountsKeys.all, "detail"] as const,
  detail: (id: string) => [...accountsKeys.details(), id] as const,
};

/** Hook for listing accounts with optional filters. Requires access token. */
export const useListAccounts = (params: ListAccountsParams, token: string) => {
  return useQuery<AccountPageResult, ApiError>({
    queryKey: accountsKeys.list(params),
    queryFn: () => listAccounts(params, token),
    enabled: !!token,
  });
};

/** Hook for fetching a single account by ID */
export const useGetAccount = (accountId: string, token: string) => {
  return useQuery<Account, ApiError>({
    queryKey: accountsKeys.detail(accountId),
    queryFn: () => getAccount(accountId, token),
    enabled: !!token && !!accountId,
  });
};

/** Hook for creating a new account */
export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<Account, ApiError, NewAccount & { token: string }>({
    mutationFn: ({ token, ...data }) => createAccount(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountsKeys.lists() });
    },
  });
};

/** Hook for updating an existing account */
export const useUpdateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<Account, ApiError, { accountId: string; data: UpdateAccount; token: string }>({
    mutationFn: ({ accountId, data, token }) => updateAccount(accountId, data, token),
    onSuccess: (_data, { accountId }) => {
      queryClient.invalidateQueries({ queryKey: accountsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: accountsKeys.detail(accountId) });
    },
  });
};

/** Hook for deleting an account */
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, { accountId: string; token: string }>({
    mutationFn: ({ accountId, token }) => deleteAccount(accountId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: accountsKeys.lists() });
    },
  });
};
