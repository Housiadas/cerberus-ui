import { describe, expect, it } from "vitest";

import { createAuthStore, decodeJwtPayload, isTokenExpired } from "@/stores/auth/auth-store";

import { createExpiredMockJwt, createMockJwt } from "../helpers/jwt";

describe("decodeJwtPayload", () => {
  it("decodes a valid JWT payload", () => {
    const token = createMockJwt({ sub: "u1", name: "Alice", roles: ["admin"], permissions: ["users:read"] });
    const payload = decodeJwtPayload(token);
    expect(payload).not.toBeNull();
    expect(payload?.sub).toBe("u1");
    expect(payload?.name).toBe("Alice");
    expect(payload?.roles).toEqual(["admin"]);
    expect(payload?.permissions).toEqual(["users:read"]);
  });

  it("returns null for an invalid token", () => {
    expect(decodeJwtPayload("not-a-jwt")).toBeNull();
    expect(decodeJwtPayload("")).toBeNull();
  });
});

describe("isTokenExpired", () => {
  it("returns false for a valid token", () => {
    const token = createMockJwt({});
    expect(isTokenExpired(token)).toBe(false);
  });

  it("returns true for an expired token", () => {
    const token = createExpiredMockJwt();
    expect(isTokenExpired(token)).toBe(true);
  });

  it("returns true for an invalid token", () => {
    expect(isTokenExpired("invalid")).toBe(true);
  });
});

describe("createAuthStore", () => {
  it("initializes with default unauthenticated state", () => {
    const store = createAuthStore();
    const state = store.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.accessToken).toBeNull();
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(true);
  });

  it("sets tokens and derives user from JWT", () => {
    const store = createAuthStore();
    const token = createMockJwt({
      sub: "user-42",
      name: "Bob",
      email: "bob@test.com",
      roles: ["editor"],
      permissions: ["posts:write", "posts:read"],
    });

    store.getState().setTokens(token, "refresh-token");

    const state = store.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.accessToken).toBe(token);
    expect(state.refreshToken).toBe("refresh-token");
    expect(state.user?.id).toBe("user-42");
    expect(state.user?.name).toBe("Bob");
    expect(state.user?.roles).toEqual(["editor"]);
    expect(state.user?.permissions).toEqual(["posts:write", "posts:read"]);
  });

  it("rejects expired tokens in setTokens", () => {
    const store = createAuthStore();
    const token = createExpiredMockJwt();

    store.getState().setTokens(token, "refresh");

    const state = store.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it("clears session", () => {
    const store = createAuthStore();
    const token = createMockJwt({ sub: "user-1" });
    store.getState().setTokens(token, "refresh");
    expect(store.getState().isAuthenticated).toBe(true);

    store.getState().clearSession();

    const state = store.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.accessToken).toBeNull();
    expect(state.user).toBeNull();
  });

  it("sets loading state", () => {
    const store = createAuthStore();
    expect(store.getState().isLoading).toBe(true);

    store.getState().setLoading(false);
    expect(store.getState().isLoading).toBe(false);
  });
});
