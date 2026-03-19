// Auth API client functions.
// Each function maps to an auth endpoint from the OpenAPI spec.

import type {
  ForgotPasswordReq,
  LoginReq,
  LogoutReq,
  RefreshTokenReq,
  RegisterReq,
  ResetPasswordReq,
  Token,
  User,
} from "@/types/auth";

import { API_BASE, buildHeaders, handleResponse } from "./client";

/** POST /api/v1/auth/login - Validate user credentials */
export const authLogin = async (data: LoginReq): Promise<Token> => {
  const response = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<Token>(response);
};

/** POST /api/v1/auth/register - Register a new user */
export const authRegister = async (data: RegisterReq): Promise<User> => {
  const response = await fetch(`${API_BASE}/api/v1/auth/register`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<User>(response);
};

/** POST /api/v1/auth/refresh - Refresh JWT tokens */
export const authRefresh = async (data: RefreshTokenReq): Promise<Token> => {
  const response = await fetch(`${API_BASE}/api/v1/auth/refresh`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<Token>(response);
};

/** POST /api/v1/auth/logout - Logout a user (requires bearer token) */
export const authLogout = async (data: LogoutReq, accessToken: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/auth/logout`, {
    method: "POST",
    headers: buildHeaders(accessToken),
    body: JSON.stringify(data),
  });
  return handleResponse<void>(response);
};

/** POST /api/v1/auth/forgot-password - Initiate password reset flow */
export const authForgotPassword = async (data: ForgotPasswordReq): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/auth/forgot-password`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<void>(response);
};

/** POST /api/v1/auth/reset-password - Reset password with a valid token */
export const authResetPassword = async (data: ResetPasswordReq): Promise<void> => {
  const response = await fetch(`${API_BASE}/api/v1/auth/reset-password`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(data),
  });
  return handleResponse<void>(response);
};
