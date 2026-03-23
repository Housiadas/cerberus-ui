// Roles API client functions.
// Each function maps to a role endpoint from the OpenAPI spec.

import type { AddRolePermissionReq, ListRolesParams, NewRole, Role, RolePageResult, UpdateRole } from "@/types/roles";

import { API_BASE, buildHeaders, handleResponse } from "./client";

/** GET /api/v1/roles - List roles with optional filters */
export const listRoles = async (params: ListRolesParams, token: string): Promise<RolePageResult> => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      searchParams.set(key, value);
    }
  }
  const query = searchParams.toString();
  const url = `${API_BASE}/api/v1/roles${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: buildHeaders(token),
  });
  return handleResponse<RolePageResult>(response);
};

/** POST /api/v1/roles - Create a new role */
export const createRole = async (data: NewRole, token: string): Promise<Role> => {
  const response = await fetch(`${API_BASE}/api/v1/roles`, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<Role>(response);
};

/** PUT /api/v1/roles/:roleId - Update an existing role */
export const updateRole = async (roleId: string, data: UpdateRole, token: string): Promise<Role> => {
  const response = await fetch(`${API_BASE}/api/v1/roles/${roleId}`, {
    method: "PUT",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<Role>(response);
};

/** DELETE /api/v1/roles/:roleId - Delete a role */
export const deleteRole = async (roleId: string, token: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/roles/${roleId}`, {
    method: "DELETE",
    headers: buildHeaders(token),
  });
  return handleResponse<void>(response);
};

/** POST /api/v1/roles/:roleId/permission - Add a permission to a role */
export const addRolePermission = async (roleId: string, data: AddRolePermissionReq, token: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/roles/${roleId}/permission`, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<void>(response);
};

/** DELETE /api/v1/roles/:roleId/permission?permission_id=... - Remove a permission from a role */
export const removeRolePermission = async (roleId: string, permissionId: string, token: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/roles/${roleId}/permission?permission_id=${permissionId}`, {
    method: "DELETE",
    headers: buildHeaders(token),
  });
  return handleResponse<void>(response);
};
