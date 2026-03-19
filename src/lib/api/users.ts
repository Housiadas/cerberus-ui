// Users API client functions.
// Each function maps to a user endpoint from the OpenAPI spec.

import type { User } from "@/types/auth";
import type {
  AddUserRoleReq,
  CreateUserReq,
  ListUsersParams,
  UpdateMeReq,
  UpdateUserReq,
  UserPageResult,
} from "@/types/users";

import { API_BASE, buildHeaders, handleResponse } from "./client";

// ---- Self-Service ----

/** GET /api/v1/users/me - Get the authenticated user's own profile */
export const getMe = async (token: string): Promise<User> => {
  const response = await fetch(`${API_BASE}/api/v1/users/me`, {
    method: "GET",
    headers: buildHeaders(token),
  });
  return handleResponse<User>(response);
};

/** PUT /api/v1/users/me - Update the authenticated user's own profile */
export const updateMe = async (data: UpdateMeReq, token: string): Promise<User> => {
  const response = await fetch(`${API_BASE}/api/v1/users/me`, {
    method: "PUT",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<User>(response);
};

// ---- Admin CRUD ----

/** GET /api/v1/users - List users with optional filters */
export const listUsers = async (params: ListUsersParams, token: string): Promise<UserPageResult> => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      searchParams.set(key, value);
    }
  }
  const query = searchParams.toString();
  const url = `${API_BASE}/api/v1/users${query ? `?${query}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: buildHeaders(token),
  });
  return handleResponse<UserPageResult>(response);
};

/** POST /api/v1/users - Create a new user */
export const createUser = async (data: CreateUserReq, token: string): Promise<User> => {
  const response = await fetch(`${API_BASE}/api/v1/users`, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<User>(response);
};

/** GET /api/v1/users/:userId - Get user by ID */
export const getUser = async (userId: string, token: string): Promise<User> => {
  const response = await fetch(`${API_BASE}/api/v1/users/${userId}`, {
    method: "GET",
    headers: buildHeaders(token),
  });
  return handleResponse<User>(response);
};

/** PUT /api/v1/users/:userId - Update an existing user */
export const updateUser = async (userId: string, data: UpdateUserReq, token: string): Promise<User> => {
  const response = await fetch(`${API_BASE}/api/v1/users/${userId}`, {
    method: "PUT",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<User>(response);
};

/** DELETE /api/v1/users/:userId - Delete a user */
export const deleteUser = async (userId: string, token: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/users/${userId}`, {
    method: "DELETE",
    headers: buildHeaders(token),
  });
  return handleResponse<void>(response);
};

// ---- User Role Management ----

/** POST /api/v1/users/:userId/role - Add a role to a user */
export const addUserRole = async (userId: string, data: AddUserRoleReq, token: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/users/${userId}/role`, {
    method: "POST",
    headers: buildHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<void>(response);
};

/** DELETE /api/v1/users/:userId/role?role_id=... - Remove a role from a user */
export const removeUserRole = async (userId: string, roleId: string, token: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/users/${userId}/role?role_id=${roleId}`, {
    method: "DELETE",
    headers: buildHeaders(token),
  });
  return handleResponse<void>(response);
};
