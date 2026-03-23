// MSW v2 handlers for auth endpoints.

import { HttpResponse, http } from "msw";

import { createMockJwt, MOCK_CREDENTIALS } from "../jwt";

const BASE = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

export const authHandlers = [
  /** POST /api/v1/auth/login */
  http.post(`${BASE}/api/v1/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email !== MOCK_CREDENTIALS.email || body.password !== MOCK_CREDENTIALS.password) {
      return HttpResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    return HttpResponse.json({
      accessToken: createMockJwt(),
      refreshToken: "mock-refresh-token",
      expiresIn: 3600,
    });
  }),

  /** POST /api/v1/auth/register */
  http.post(`${BASE}/api/v1/auth/register`, async ({ request }) => {
    const body = (await request.json()) as { name: string; email: string };

    return HttpResponse.json({
      id: "new-user-1",
      name: body.name,
      email: body.email,
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }),

  /** POST /api/v1/auth/logout */
  http.post(`${BASE}/api/v1/auth/logout`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  /** POST /api/v1/auth/forgot-password */
  http.post(`${BASE}/api/v1/auth/forgot-password`, () => {
    return new HttpResponse(null, { status: 204 });
  }),

  /** POST /api/v1/auth/refresh */
  http.post(`${BASE}/api/v1/auth/refresh`, () => {
    return HttpResponse.json({
      accessToken: createMockJwt(),
      refreshToken: "mock-refresh-token-new",
      expiresIn: 3600,
    });
  }),
];
