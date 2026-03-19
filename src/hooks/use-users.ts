// React Query hooks for user endpoints.
// Usage: import { useMe, useListUsers, useCreateUser, ... } from '@/hooks/use-users'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addUserRole,
  createUser,
  deleteUser,
  getMe,
  getUser,
  listUsers,
  removeUserRole,
  updateMe,
  updateUser,
} from "@/lib/api/users";
import type { ApiError, User } from "@/types/auth";
import type {
  AddUserRoleReq,
  CreateUserReq,
  ListUsersParams,
  UpdateMeReq,
  UpdateUserReq,
  UserPageResult,
} from "@/types/users";

/** Users query key factory */
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (params: ListUsersParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  me: () => [...userKeys.all, "me"] as const,
};

// ---- Self-Service Hooks ----

/** Hook to get the current authenticated user's profile */
export const useMe = (token: string) => {
  return useQuery<User, ApiError>({
    queryKey: userKeys.me(),
    queryFn: () => getMe(token),
    enabled: !!token,
  });
};

/** Hook to update the current user's own profile */
export const useUpdateMe = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation<User, ApiError, UpdateMeReq>({
    mutationFn: (data) => updateMe(data, token),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.me(), updatedUser);
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

// ---- Admin CRUD Hooks ----

/** Hook to list users with optional search/filter params */
export const useListUsers = (params: ListUsersParams, token: string) => {
  return useQuery<UserPageResult, ApiError>({
    queryKey: userKeys.list(params),
    queryFn: () => listUsers(params, token),
    enabled: !!token,
  });
};

/** Hook to get a single user by ID */
export const useUser = (userId: string, token: string) => {
  return useQuery<User, ApiError>({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUser(userId, token),
    enabled: !!token && !!userId,
  });
};

/** Hook to create a new user */
export const useCreateUser = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation<User, ApiError, CreateUserReq>({
    mutationFn: (data) => createUser(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

/** Hook to update an existing user (admin) */
export const useUpdateUser = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation<User, ApiError, { userId: string; data: UpdateUserReq }>({
    mutationFn: ({ userId, data }) => updateUser(userId, data, token),
    onSuccess: (updatedUser, { userId }) => {
      queryClient.setQueryData(userKeys.detail(userId), updatedUser);
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

/** Hook to delete a user */
export const useDeleteUser = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (userId) => deleteUser(userId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

// ---- User Role Management Hooks ----

/** Hook to add a role to a user */
export const useAddUserRole = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, { userId: string; data: AddUserRoleReq }>({
    mutationFn: ({ userId, data }) => addUserRole(userId, data, token),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
    },
  });
};

/** Hook to remove a role from a user */
export const useRemoveUserRole = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, { userId: string; roleId: string }>({
    mutationFn: ({ userId, roleId }) => removeUserRole(userId, roleId, token),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(userId) });
    },
  });
};
