// MSW v2 handlers for permission endpoints.

import { HttpResponse, http } from "msw";

import type { Permission } from "@/types/permissions";

const BASE = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

export let mockPermissions: Permission[] = [
  { id: "p1", name: "users:create", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "p2", name: "users:read", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "p3", name: "users:edit", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "p4", name: "users:delete", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "p5", name: "roles:create", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "p6", name: "roles:read", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "p7", name: "roles:edit", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "p8", name: "roles:delete", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "p9", name: "permissions:read", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "p10", name: "permissions:edit", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
];

let nextId = 11;

export const permissionHandlers = [
  /** GET /api/v1/permissions */
  http.get(`${BASE}/api/v1/permissions`, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name")?.toLowerCase();

    let filtered = mockPermissions;
    if (name) filtered = filtered.filter((p) => p.name.toLowerCase().includes(name));

    return HttpResponse.json({
      data: filtered,
      metadata: { hasMore: false, limit: 50 },
    });
  }),

  /** POST /api/v1/permissions */
  http.post(`${BASE}/api/v1/permissions`, async ({ request }) => {
    const body = (await request.json()) as { name: string };
    const newPermission: Permission = {
      id: `p${nextId++}`,
      name: body.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockPermissions.push(newPermission);
    return HttpResponse.json(newPermission, { status: 201 });
  }),

  /** PUT /api/v1/permissions/:permissionId */
  http.put(`${BASE}/api/v1/permissions/:permissionId`, async ({ params, request }) => {
    const body = (await request.json()) as Partial<Permission>;
    const index = mockPermissions.findIndex((p) => p.id === params.permissionId);
    if (index === -1) return HttpResponse.json({ message: "Permission not found" }, { status: 404 });

    mockPermissions[index] = { ...mockPermissions[index], ...body, updatedAt: new Date().toISOString() };
    return HttpResponse.json(mockPermissions[index]);
  }),

  /** DELETE /api/v1/permissions/:permissionId */
  http.delete(`${BASE}/api/v1/permissions/:permissionId`, ({ params }) => {
    const index = mockPermissions.findIndex((p) => p.id === params.permissionId);
    if (index === -1) return HttpResponse.json({ message: "Permission not found" }, { status: 404 });
    mockPermissions = mockPermissions.filter((p) => p.id !== params.permissionId);
    return new HttpResponse(null, { status: 204 });
  }),
];
