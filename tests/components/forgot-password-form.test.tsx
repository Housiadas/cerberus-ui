import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { ForgotPasswordForm } from "@/app/(auth)/_components/forgot-password-form";

const API_BASE = "http://localhost:4000";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("ForgotPasswordForm", () => {
  it("renders email field and submit button", () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <ForgotPasswordForm />
      </Wrapper>,
    );

    expect(screen.getByPlaceholderText("you@example.com")).toBeTruthy();
    expect(screen.getByRole("button", { name: /send reset link/i })).toBeTruthy();
  });

  it("validates email field", async () => {
    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <ForgotPasswordForm />
      </Wrapper>,
    );

    fireEvent.click(screen.getByRole("button", { name: /send reset link/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email/i)).toBeTruthy();
    });
  });

  it("shows success message after submission", async () => {
    server.use(http.post(`${API_BASE}/api/v1/auth/forgot-password`, () => new HttpResponse(null, { status: 204 })));

    const Wrapper = createWrapper();
    render(
      <Wrapper>
        <ForgotPasswordForm />
      </Wrapper>,
    );

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send reset link/i }));

    await waitFor(() => {
      expect(screen.getByText(/check your email/i)).toBeTruthy();
    });
  });
});
