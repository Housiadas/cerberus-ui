// Shared API client utilities used by all API modules.

import { APP_CONFIG } from "@/config";

export const API_BASE = APP_CONFIG.server.url;

/** Handle JSON responses and errors */
export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw await response.json().catch(() => ({
      message: response.statusText,
    }));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as Promise<T>;
};

/** Build headers, optionally including a bearer token */
export const buildHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};
