// MSW v2 handlers for user endpoints.

import { HttpResponse, http } from "msw";

import type { User } from "@/types/auth";

const BASE = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

let mockUsers: User[] = [
  {
    id: "u1",
    name: "Alice Johnson",
    email: "alice@cerberus.dev",
    department: "Engineering",
    enabled: true,
    createdAt: "2025-01-10T08:00:00Z",
    updatedAt: "2025-06-15T10:30:00Z",
  },
  {
    id: "u2",
    name: "Bob Smith",
    email: "bob@cerberus.dev",
    department: "Marketing",
    enabled: true,
    createdAt: "2025-02-14T09:00:00Z",
    updatedAt: "2025-07-01T14:00:00Z",
  },
  {
    id: "u3",
    name: "Carol Davis",
    email: "carol@cerberus.dev",
    department: "Support",
    enabled: false,
    createdAt: "2025-03-20T11:00:00Z",
    updatedAt: "2025-08-10T16:45:00Z",
  },
  {
    id: "u4",
    name: "Dan Wilson",
    email: "dan@cerberus.dev",
    department: "Engineering",
    enabled: true,
    createdAt: "2025-04-05T07:30:00Z",
    updatedAt: "2025-09-12T09:15:00Z",
  },
  {
    id: "u5",
    name: "Eve Martinez",
    email: "eve@cerberus.dev",
    department: "Finance",
    enabled: true,
    createdAt: "2025-05-18T13:00:00Z",
    updatedAt: "2025-10-03T11:00:00Z",
  },
  {
    id: "u6",
    name: "Frank Lee",
    email: "frank@cerberus.dev",
    department: "Support",
    enabled: true,
    createdAt: "2025-06-22T15:00:00Z",
    updatedAt: "2025-11-20T17:30:00Z",
  },
  {
    id: "u7",
    name: "Grace Chen",
    email: "grace@cerberus.dev",
    department: "Engineering",
    enabled: true,
    createdAt: "2025-07-30T10:00:00Z",
    updatedAt: "2025-12-05T08:00:00Z",
  },
  {
    id: "u8",
    name: "Henry Brown",
    email: "henry@cerberus.dev",
    department: "Marketing",
    enabled: false,
    createdAt: "2025-08-11T12:00:00Z",
    updatedAt: "2026-01-15T13:00:00Z",
  },
];

// The "logged-in" user matching the mock JWT (sub: "user-1")
let mockMe: User = {
  id: "user-1",
  name: "Admin User",
  email: "admin@cerberus.dev",
  department: "Engineering",
  enabled: true,
  createdAt: "2025-01-01T00:00:00Z",
  updatedAt: "2025-06-01T00:00:00Z",
};

let nextId = 9;

export const userHandlers = [
  /** GET /api/v1/users/me - must be before :userId to avoid param match */
  http.get(`${BASE}/api/v1/users/me`, () => {
    return HttpResponse.json(mockMe);
  }),

  /** PUT /api/v1/users/me */
  http.put(`${BASE}/api/v1/users/me`, async ({ request }) => {
    const body = (await request.json()) as Partial<User & { password?: string; passwordConfirm?: string }>;
    const { password: _pw, passwordConfirm: _pwc, ...profile } = body;
    mockMe = { ...mockMe, ...profile, updatedAt: new Date().toISOString() };
    return HttpResponse.json(mockMe);
  }),

  /** GET /api/v1/users */
  http.get(`${BASE}/api/v1/users`, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name")?.toLowerCase();
    const email = url.searchParams.get("email")?.toLowerCase();

    let filtered = mockUsers;
    if (name) filtered = filtered.filter((u) => u.name.toLowerCase().includes(name));
    if (email) filtered = filtered.filter((u) => u.email.toLowerCase().includes(email));

    return HttpResponse.json({
      data: filtered,
      metadata: { hasMore: false, limit: 50 },
    });
  }),

  /** GET /api/v1/users/:userId */
  http.get(`${BASE}/api/v1/users/:userId`, ({ params }) => {
    const user = mockUsers.find((u) => u.id === params.userId);
    if (!user) return HttpResponse.json({ message: "User not found" }, { status: 404 });
    return HttpResponse.json(user);
  }),

  /** POST /api/v1/users */
  http.post(`${BASE}/api/v1/users`, async ({ request }) => {
    const body = (await request.json()) as { name: string; email: string; department?: string };
    const newUser: User = {
      id: `u${nextId++}`,
      name: body.name,
      email: body.email,
      department: body.department,
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return HttpResponse.json(newUser, { status: 201 });
  }),

  /** PUT /api/v1/users/:userId */
  http.put(`${BASE}/api/v1/users/:userId`, async ({ params, request }) => {
    const body = (await request.json()) as Partial<User>;
    const index = mockUsers.findIndex((u) => u.id === params.userId);
    if (index === -1) return HttpResponse.json({ message: "User not found" }, { status: 404 });

    mockUsers[index] = { ...mockUsers[index], ...body, updatedAt: new Date().toISOString() };
    return HttpResponse.json(mockUsers[index]);
  }),

  /** DELETE /api/v1/users/:userId */
  http.delete(`${BASE}/api/v1/users/:userId`, ({ params }) => {
    const index = mockUsers.findIndex((u) => u.id === params.userId);
    if (index === -1) return HttpResponse.json({ message: "User not found" }, { status: 404 });
    mockUsers = mockUsers.filter((u) => u.id !== params.userId);
    return new HttpResponse(null, { status: 204 });
  }),
];
