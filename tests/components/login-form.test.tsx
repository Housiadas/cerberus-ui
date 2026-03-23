import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { LoginForm } from "@/app/(auth)/_components/login-form";

// Polyfill ResizeObserver for Radix UI
class ResizeObserverStub {
  observe() {
    // noop
  }
  unobserve() {
    // noop
  }
  disconnect() {
    // noop
  }
}
globalThis.ResizeObserver ??= ResizeObserverStub as unknown as typeof ResizeObserver;

const API_BASE = "http://localhost:4000";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

vi.mock("@/lib/api/session", () => ({
  saveSession: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/stores/auth/auth-provider", () => ({
  useAuthStore: (selector: (state: Record<string, unknown>) => unknown) =>
    selector({
      setTokens: vi.fn(),
      clearSession: vi.fn(),
      user: null,
      isAuthenticated: false,
      isLoading: false,
      accessToken: null,
      refreshToken: null,
      setLoading: vi.fn(),
    }),
}));

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  mockPush.mockClear();
});
afterAll(() => server.close());

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("LoginForm", () => {
  it("renders email and password fields", () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>,
    );

    expect(screen.getByPlaceholderText("you@example.com")).toBeTruthy();
    expect(screen.getByPlaceholderText("••••••••")).toBeTruthy();
    expect(screen.getByRole("button", { name: /login/i })).toBeTruthy();
  });

  it("shows validation errors for empty fields", async () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>,
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeTruthy();
    });
  });

  it("submits successfully and redirects", async () => {
    const mockToken = {
      accessToken: "access-123",
      refreshToken: "refresh-456",
      expiresIn: 3600,
    };

    server.use(http.post(`${API_BASE}/api/v1/auth/login`, () => HttpResponse.json(mockToken)));

    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>,
    );

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("does not redirect on failed login", async () => {
    server.use(
      http.post(`${API_BASE}/api/v1/auth/login`, () =>
        HttpResponse.json({ message: "Invalid credentials" }, { status: 401 }),
      ),
    );

    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <LoginForm />
      </Wrapper>,
    );

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "bad@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "wrongpass" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for mutation to complete, then verify no redirect happened
    await waitFor(
      () => {
        expect(mockPush).not.toHaveBeenCalled();
      },
      { timeout: 2000 },
    );
  });
});
