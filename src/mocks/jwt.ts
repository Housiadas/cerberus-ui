// Mock JWT helpers for MSW handlers in development.

import type { JwtPayload } from "@/types/rbac";

/** Create a fake JWT token string from a payload (no real signature) */
export const createMockJwt = (payload?: Partial<JwtPayload>): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const fullPayload: JwtPayload = {
    sub: payload?.sub ?? "user-1",
    name: payload?.name ?? "Admin User",
    email: payload?.email ?? "admin@cerberus.dev",
    roles: payload?.roles ?? ["admin"],
    permissions: payload?.permissions ?? [
      "users:create",
      "users:read",
      "users:edit",
      "users:delete",
      "roles:create",
      "roles:read",
      "roles:edit",
      "roles:delete",
      "finance:read",
      "finance:write",
      "crm:read",
      "crm:write",
      "analytics:read",
      "analytics:write",
    ],
    exp: payload?.exp ?? Math.floor(Date.now() / 1000) + 3600,
    iat: payload?.iat ?? Math.floor(Date.now() / 1000),
  };
  const body = btoa(JSON.stringify(fullPayload));
  const signature = btoa("fake-signature");
  return `${header}.${body}.${signature}`;
};

/** Mock credentials for development login */
export const MOCK_CREDENTIALS = {
  email: "admin@cerberus.dev",
  password: "password123",
} as const;
