import type React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { createStore, type StoreApi, useStore } from "zustand";

import { ChangePasswordForm } from "@/app/(main)/dashboard/profile/_components/change-password-form";
import { ProfileDetailsForm } from "@/app/(main)/dashboard/profile/_components/profile-details-form";
import type { AuthState } from "@/types/rbac";

const API_BASE = "http://localhost:4000";

const mockMe = {
  id: "user-1",
  name: "Admin User",
  email: "admin@cerberus.dev",
  department: "Engineering",
  enabled: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-06-01T00:00:00Z",
};

let lastPutBody: Record<string, unknown> | null = null;

const server = setupServer(
  http.get(`${API_BASE}/api/v1/users/me`, () => HttpResponse.json(mockMe)),
  http.put(`${API_BASE}/api/v1/users/me`, async ({ request }) => {
    lastPutBody = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json({ ...mockMe, ...lastPutBody, updatedAt: new Date().toISOString() });
  }),
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  lastPutBody = null;
});
afterAll(() => server.close());

const createTestAuthStore = (): StoreApi<AuthState> =>
  createStore<AuthState>()((_set) => ({
    accessToken: "test-token",
    refreshToken: "test-refresh",
    user: {
      id: "user-1",
      name: "Admin User",
      email: "admin@cerberus.dev",
      roles: ["admin"],
      permissions: [],
    },
    isAuthenticated: true,
    isLoading: false,
    setTokens: vi.fn(),
    clearSession: vi.fn(),
    setLoading: vi.fn(),
  }));

vi.mock("@/stores/auth/auth-provider", () => {
  let mockStore: StoreApi<AuthState> | null = null;

  return {
    setMockStore: (store: StoreApi<AuthState>) => {
      mockStore = store;
    },
    useAuthStore: <T,>(selector: (state: AuthState) => T): T => {
      if (!mockStore) throw new Error("No mock store set");
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useStore(mockStore, selector);
    },
  };
});

const { setMockStore } = (await import("@/stores/auth/auth-provider")) as unknown as {
  setMockStore: (store: StoreApi<AuthState>) => void;
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("ProfileDetailsForm", () => {
  it("shows loading state initially", () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <ProfileDetailsForm />
      </Wrapper>,
    );

    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  it("populates form with user data from GET /users/me", async () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <ProfileDetailsForm />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue("Admin User")).toBeTruthy();
      expect(screen.getByDisplayValue("admin@cerberus.dev")).toBeTruthy();
      expect(screen.getByDisplayValue("Engineering")).toBeTruthy();
    });
  });

  it("submits updated details via PUT /users/me", async () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <ProfileDetailsForm />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue("Admin User")).toBeTruthy();
    });

    const nameInput = screen.getByDisplayValue("Admin User");
    fireEvent.change(nameInput, { target: { value: "Updated Name" } });
    fireEvent.click(screen.getByText("Save Changes"));

    await waitFor(() => {
      expect(lastPutBody).toBeTruthy();
      expect(lastPutBody?.name).toBe("Updated Name");
    });
  });

  it("renders form labels", async () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <ProfileDetailsForm />
      </Wrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("Name")).toBeTruthy();
      expect(screen.getByText("Email")).toBeTruthy();
      expect(screen.getByText("Department")).toBeTruthy();
    });
  });
});

describe("ChangePasswordForm", () => {
  it("renders password fields", () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <ChangePasswordForm />
      </Wrapper>,
    );

    expect(screen.getByText("New Password")).toBeTruthy();
    expect(screen.getByText("Confirm Password")).toBeTruthy();
    expect(screen.getByText("Update Password")).toBeTruthy();
  });

  it("shows validation error when passwords do not match", async () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <ChangePasswordForm />
      </Wrapper>,
    );

    const passwordInput = screen.getByPlaceholderText("Min. 8 characters");
    const confirmInput = screen.getByLabelText("Confirm Password");

    fireEvent.change(passwordInput, { target: { value: "newpassword1" } });
    fireEvent.change(confirmInput, { target: { value: "different99" } });
    fireEvent.click(screen.getByText("Update Password"));

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeTruthy();
    });
  });

  it("submits password change via PUT /users/me", async () => {
    setMockStore(createTestAuthStore());
    const Wrapper = createWrapper();

    render(
      <Wrapper>
        <ChangePasswordForm />
      </Wrapper>,
    );

    const passwordInput = screen.getByPlaceholderText("Min. 8 characters");
    const confirmInput = screen.getByLabelText("Confirm Password");

    fireEvent.change(passwordInput, { target: { value: "newpassword1" } });
    fireEvent.change(confirmInput, { target: { value: "newpassword1" } });
    fireEvent.click(screen.getByText("Update Password"));

    await waitFor(() => {
      expect(lastPutBody).toBeTruthy();
      expect(lastPutBody?.password).toBe("newpassword1");
      expect(lastPutBody?.passwordConfirm).toBe("newpassword1");
    });
  });
});
