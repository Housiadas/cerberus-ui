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

const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:4000";

/** Shared helper to handle JSON responses and errors */
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw await response.json().catch(() => ({
      message: response.statusText,
    }));
  }

  // 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as Promise<T>;
};

/** Build headers, optionally including a bearer token */
const buildHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

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
