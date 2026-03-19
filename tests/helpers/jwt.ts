// Test helper to create mock JWT tokens with custom payloads.

import type { JwtPayload } from "@/types/rbac";

/** Create a fake JWT token string from a payload (no real signature) */
export const createMockJwt = (payload: Partial<JwtPayload>): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const fullPayload: JwtPayload = {
    sub: payload.sub ?? "user-1",
    name: payload.name ?? "Test User",
    email: payload.email ?? "test@example.com",
    roles: payload.roles ?? [],
    permissions: payload.permissions ?? [],
    exp: payload.exp ?? Math.floor(Date.now() / 1000) + 3600,
    iat: payload.iat ?? Math.floor(Date.now() / 1000),
  };
  const body = btoa(JSON.stringify(fullPayload));
  const signature = btoa("fake-signature");
  return `${header}.${body}.${signature}`;
};

/** Create an expired mock JWT */
export const createExpiredMockJwt = (payload?: Partial<JwtPayload>): string =>
  createMockJwt({
    ...payload,
    exp: Math.floor(Date.now() / 1000) - 3600,
  });
