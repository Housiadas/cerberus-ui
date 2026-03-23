// React Query hooks for role endpoints.
// Usage: import { useListRoles, useCreateRole, ... } from '@/hooks/use-roles'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addRolePermission,
  createRole,
  deleteRole,
  listRoles,
  removeRolePermission,
  updateRole,
} from "@/lib/api/roles";
import type { ApiError } from "@/types/auth";
import type { AddRolePermissionReq, ListRolesParams, NewRole, Role, RolePageResult, UpdateRole } from "@/types/roles";

/** Roles query key factory */
export const rolesKeys = {
  all: ["roles"] as const,
  lists: () => [...rolesKeys.all, "list"] as const,
  list: (params: ListRolesParams) => [...rolesKeys.lists(), params] as const,
};

/** Hook for listing roles with optional filters. Requires access token. */
export const useListRoles = (params: ListRolesParams, token: string) => {
  return useQuery<RolePageResult, ApiError>({
    queryKey: rolesKeys.list(params),
    queryFn: () => listRoles(params, token),
    enabled: !!token,
  });
};

/** Hook for creating a new role */
export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation<Role, ApiError, NewRole & { token: string }>({
    mutationFn: ({ token, ...data }) => createRole(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolesKeys.lists() });
    },
  });
};

/** Hook for updating an existing role */
export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation<Role, ApiError, { roleId: string; data: UpdateRole; token: string }>({
    mutationFn: ({ roleId, data, token }) => updateRole(roleId, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolesKeys.lists() });
    },
  });
};

/** Hook for deleting a role */
export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, { roleId: string; token: string }>({
    mutationFn: ({ roleId, token }) => deleteRole(roleId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolesKeys.lists() });
    },
  });
};

/** Hook for adding a permission to a role */
export const useAddRolePermission = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, { roleId: string; data: AddRolePermissionReq; token: string }>({
    mutationFn: ({ roleId, data, token }) => addRolePermission(roleId, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolesKeys.all });
    },
  });
};

/** Hook for removing a permission from a role */
export const useRemoveRolePermission = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, { roleId: string; permissionId: string; token: string }>({
    mutationFn: ({ roleId, permissionId, token }) => removeRolePermission(roleId, permissionId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rolesKeys.all });
    },
  });
};
