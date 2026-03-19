// Zustand store for authentication state including JWT tokens, user info, roles, and permissions.
// Usage: import { useAuthStore } from '@/stores/auth/auth-provider'

import { createStore } from "zustand/vanilla";

import type { AuthState, AuthUser, JwtPayload } from "@/types/rbac";
import { jwtPayloadSchema } from "@/types/rbac";

/** Decode a JWT access token and extract user info, roles, and permissions */
export const decodeJwtPayload = (token: string): JwtPayload | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    const parsed = jwtPayloadSchema.safeParse(payload);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
};

/** Check if a JWT token is expired */
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJwtPayload(token);
  if (!payload) return true;
  return Date.now() >= payload.exp * 1000;
};

/** Extract AuthUser from a decoded JWT payload */
const toAuthUser = (payload: JwtPayload): AuthUser => ({
  id: payload.sub,
  name: payload.name,
  email: payload.email,
  roles: payload.roles,
  permissions: payload.permissions,
});

export const createAuthStore = (init?: Partial<AuthState>) =>
  createStore<AuthState>()((set) => ({
    accessToken: init?.accessToken ?? null,
    refreshToken: init?.refreshToken ?? null,
    user: init?.user ?? null,
    isAuthenticated: init?.isAuthenticated ?? false,
    isLoading: init?.isLoading ?? true,

    setTokens: (accessToken: string, refreshToken: string) => {
      const payload = decodeJwtPayload(accessToken);
      if (!payload || isTokenExpired(accessToken)) {
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
        return;
      }
      set({
        accessToken,
        refreshToken,
        user: toAuthUser(payload),
        isAuthenticated: true,
      });
    },

    clearSession: () => {
      set({
        accessToken: null,
        refreshToken: null,
        user: null,
        isAuthenticated: false,
      });
    },

    setLoading: (loading: boolean) => {
      set({ isLoading: loading });
    },
  }));
