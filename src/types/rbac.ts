import { z } from "zod";

// ---- RBAC Types ----
// Defines the permission and role structures used by the auth store and guard components.

/** A decoded JWT payload containing user identity, roles, and permissions */
export const jwtPayloadSchema = z.object({
  sub: z.string(),
  name: z.string(),
  email: z.string(),
  roles: z.array(z.string()).default([]),
  permissions: z.array(z.string()).default([]),
  exp: z.number(),
  iat: z.number(),
});

export type JwtPayload = z.infer<typeof jwtPayloadSchema>;

/** The authenticated user state derived from the JWT */
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
};

/** Auth session state stored in Zustand */
export type AuthSession = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

/** Auth session actions */
export type AuthActions = {
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearSession: () => void;
  setLoading: (loading: boolean) => void;
};

export type AuthState = AuthSession & AuthActions;
