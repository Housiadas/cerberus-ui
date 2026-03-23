import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

import { RegisterForm } from "@/app/(auth)/_components/register-form";

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

describe("RegisterForm", () => {
  it("renders all fields including name", () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <RegisterForm />
      </Wrapper>,
    );

    expect(screen.getByPlaceholderText("John Doe")).toBeTruthy();
    expect(screen.getByPlaceholderText("you@example.com")).toBeTruthy();
    expect(screen.getAllByPlaceholderText("••••••••")).toHaveLength(2);
    expect(screen.getByRole("button", { name: /register/i })).toBeTruthy();
  });

  it("validates password match", async () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <RegisterForm />
      </Wrapper>,
    );

    fireEvent.change(screen.getByPlaceholderText("John Doe"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "test@example.com" },
    });

    const passwordFields = screen.getAllByPlaceholderText("••••••••");
    fireEvent.change(passwordFields[0], { target: { value: "password123" } });
    fireEvent.change(passwordFields[1], { target: { value: "different123" } });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeTruthy();
    });
  });

  it("submits successfully and redirects to login", async () => {
    const mockUser = {
      id: "new-user-1",
      name: "John",
      email: "john@example.com",
      enabled: true,
      createdAt: "2026-01-01T00:00:00Z",
      updatedAt: "2026-01-01T00:00:00Z",
    };

    server.use(http.post(`${API_BASE}/api/v1/auth/register`, () => HttpResponse.json(mockUser)));

    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <RegisterForm />
      </Wrapper>,
    );

    fireEvent.change(screen.getByPlaceholderText("John Doe"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "john@example.com" },
    });

    const passwordFields = screen.getAllByPlaceholderText("••••••••");
    fireEvent.change(passwordFields[0], { target: { value: "password123" } });
    fireEvent.change(passwordFields[1], { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });
});
