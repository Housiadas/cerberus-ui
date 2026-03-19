import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import {
  useForgotPassword,
  useLogin,
  useLogout,
  useRefreshToken,
  useRegister,
  useResetPassword,
} from "@/hooks/use-auth";

const API_BASE = "http://localhost:4000";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useLogin", () => {
  it("returns token on successful login", async () => {
    const mockToken = {
      accessToken: "access-123",
      refreshToken: "refresh-456",
      expiresIn: 3600,
    };

    server.use(http.post(`${API_BASE}/api/v1/auth/login`, () => HttpResponse.json(mockToken)));

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ email: "test@example.com", password: "password" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockToken);
  });

  it("returns error on failed login", async () => {
    server.use(
      http.post(`${API_BASE}/api/v1/auth/login`, () =>
        HttpResponse.json({ code: "UNAUTHORIZED", message: "Invalid credentials" }, { status: 401 }),
      ),
    );

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ email: "bad@example.com", password: "wrong" });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toMatchObject({
      message: "Invalid credentials",
    });
  });
});

describe("useRegister", () => {
  it("returns user on successful registration", async () => {
    const mockUser = {
      id: "user-1",
      name: "Test",
      email: "test@example.com",
      enabled: true,
      createdAt: "2026-01-01T00:00:00Z",
      updatedAt: "2026-01-01T00:00:00Z",
    };

    server.use(http.post(`${API_BASE}/api/v1/auth/register`, () => HttpResponse.json(mockUser)));

    const { result } = renderHook(() => useRegister(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      name: "Test",
      email: "test@example.com",
      password: "password123",
      passwordConfirm: "password123",
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toMatchObject({ id: "user-1" });
  });
});

describe("useRefreshToken", () => {
  it("returns new tokens on successful refresh", async () => {
    const mockToken = {
      accessToken: "new-access",
      refreshToken: "new-refresh",
      expiresIn: 3600,
    };

    server.use(http.post(`${API_BASE}/api/v1/auth/refresh`, () => HttpResponse.json(mockToken)));

    const { result } = renderHook(() => useRefreshToken(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ refreshToken: "old-refresh" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockToken);
  });
});

describe("useLogout", () => {
  it("succeeds on logout", async () => {
    server.use(http.post(`${API_BASE}/api/v1/auth/logout`, () => new HttpResponse(null, { status: 204 })));

    const { result } = renderHook(() => useLogout(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      refreshToken: "refresh-456",
      accessToken: "access-123",
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});

describe("useForgotPassword", () => {
  it("succeeds on forgot password request", async () => {
    server.use(http.post(`${API_BASE}/api/v1/auth/forgot-password`, () => new HttpResponse(null, { status: 204 })));

    const { result } = renderHook(() => useForgotPassword(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ email: "test@example.com" });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});

describe("useResetPassword", () => {
  it("succeeds on password reset", async () => {
    server.use(http.post(`${API_BASE}/api/v1/auth/reset-password`, () => new HttpResponse(null, { status: 204 })));

    const { result } = renderHook(() => useResetPassword(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({
      token: "reset-token",
      oldPassword: "oldpass",
      password: "newpass123",
      passwordConfirm: "newpass123",
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
