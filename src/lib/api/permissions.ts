// Permissions API client functions.
// Each function maps to a permission endpoint from the OpenAPI spec.

import type {
  ListPermissionsParams,
  NewPermission,
  Permission,
  PermissionPageResult,
  UpdatePermission,
} from "@/types/permissions";

import { API_BASE, buildHeaders, handleResponse } from "./client";

/** GET /api/v1/permissions - List permissions with optional filters */
export const listPermissions = async (params: ListPermissionsParams, token: string): Promise<PermissionPageResult> => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      searchParams.set(key, value);
    }
  }
  const query = searchParams.toString();
  const url = `${API_BASE}/api/v1/permissions${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: buildHeaders(token),
  });
  return handleResponse<PermissionPageResult>(response);
};

/** POST /api/v1/permissions - Create a new permission */
export const createPermission = async (data: NewPermission, token: string): Promise<Permission> => {
  const response = await fetch(`${API_BASE}/api/v1/permissions`, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<Permission>(response);
};

/** PUT /api/v1/permissions/:permissionId - Update an existing permission */
export const updatePermission = async (
  permissionId: string,
  data: UpdatePermission,
  token: string,
): Promise<Permission> => {
  const response = await fetch(`${API_BASE}/api/v1/permissions/${permissionId}`, {
    method: "PUT",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<Permission>(response);
};

/** DELETE /api/v1/permissions/:permissionId - Delete a permission */
export const deletePermission = async (permissionId: string, token: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/permissions/${permissionId}`, {
    method: "DELETE",
    headers: buildHeaders(token),
  });
  return handleResponse<void>(response);
};
