// React Query hooks for permission endpoints.
// Usage: import { useListPermissions, useCreatePermission, ... } from '@/hooks/use-permissions'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createPermission, deletePermission, listPermissions, updatePermission } from "@/lib/api/permissions";
import type { ApiError } from "@/types/auth";
import type {
  ListPermissionsParams,
  NewPermission,
  Permission,
  PermissionPageResult,
  UpdatePermission,
} from "@/types/permissions";

/** Permissions query key factory */
export const permissionsKeys = {
  all: ["permissions"] as const,
  lists: () => [...permissionsKeys.all, "list"] as const,
  list: (params: ListPermissionsParams) => [...permissionsKeys.lists(), params] as const,
};

/** Hook for listing permissions with optional filters. Requires access token. */
export const useListPermissions = (params: ListPermissionsParams, token: string) => {
  return useQuery<PermissionPageResult, ApiError>({
    queryKey: permissionsKeys.list(params),
    queryFn: () => listPermissions(params, token),
    enabled: !!token,
  });
};

/** Hook for creating a new permission */
export const useCreatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation<Permission, ApiError, NewPermission & { token: string }>({
    mutationFn: ({ token, ...data }) => createPermission(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: permissionsKeys.lists() });
    },
  });
};

/** Hook for updating an existing permission */
export const useUpdatePermission = () => {
  const queryClient = useQueryClient();

  return useMutation<Permission, ApiError, { permissionId: string; data: UpdatePermission; token: string }>({
    mutationFn: ({ permissionId, data, token }) => updatePermission(permissionId, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: permissionsKeys.lists() });
    },
  });
};

/** Hook for deleting a permission */
export const useDeletePermission = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, { permissionId: string; token: string }>({
    mutationFn: ({ permissionId, token }) => deletePermission(permissionId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: permissionsKeys.lists() });
    },
  });
};
