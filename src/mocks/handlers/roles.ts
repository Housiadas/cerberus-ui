// MSW v2 handlers for role endpoints.

import { HttpResponse, http } from "msw";

import type { Role } from "@/types/roles";

import { mockPermissions } from "./permissions";

const BASE = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000";

let mockRoles: Role[] = [
  { id: "r1", name: "admin", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "r2", name: "editor", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "r3", name: "viewer", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
];

// Maps role ID → permission IDs
const rolePermissions: Record<string, string[]> = {
  r1: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"],
  r2: ["p2", "p3", "p6", "p9"],
  r3: ["p2", "p6", "p9"],
};

let nextId = 4;

export const roleHandlers = [
  /** GET /api/v1/roles */
  http.get(`${BASE}/api/v1/roles`, ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name")?.toLowerCase();

    let filtered = mockRoles;
    if (name) filtered = filtered.filter((r) => r.name.toLowerCase().includes(name));

    return HttpResponse.json({
      data: filtered,
      metadata: { hasMore: false, limit: 50 },
    });
  }),

  /** POST /api/v1/roles */
  http.post(`${BASE}/api/v1/roles`, async ({ request }) => {
    const body = (await request.json()) as { name: string };
    const newRole: Role = {
      id: `r${nextId++}`,
      name: body.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockRoles.push(newRole);
    rolePermissions[newRole.id] = [];
    return HttpResponse.json(newRole, { status: 201 });
  }),

  /** PUT /api/v1/roles/:roleId */
  http.put(`${BASE}/api/v1/roles/:roleId`, async ({ params, request }) => {
    const body = (await request.json()) as Partial<Role>;
    const index = mockRoles.findIndex((r) => r.id === params.roleId);
    if (index === -1) return HttpResponse.json({ message: "Role not found" }, { status: 404 });

    mockRoles[index] = { ...mockRoles[index], ...body, updatedAt: new Date().toISOString() };
    return HttpResponse.json(mockRoles[index]);
  }),

  /** DELETE /api/v1/roles/:roleId */
  http.delete(`${BASE}/api/v1/roles/:roleId`, ({ params }) => {
    const roleId = params.roleId as string;
    const index = mockRoles.findIndex((r) => r.id === roleId);
    if (index === -1) return HttpResponse.json({ message: "Role not found" }, { status: 404 });
    mockRoles = mockRoles.filter((r) => r.id !== roleId);
    delete rolePermissions[roleId];
    return new HttpResponse(null, { status: 204 });
  }),

  /** GET /api/v1/roles/:roleId/permissions - Get permissions for a role */
  http.get(`${BASE}/api/v1/roles/:roleId/permissions`, ({ params }) => {
    const roleId = params.roleId as string;
    const role = mockRoles.find((r) => r.id === roleId);
    if (!role) return HttpResponse.json({ message: "Role not found" }, { status: 404 });

    const permIds = rolePermissions[roleId] ?? [];
    const permissions = mockPermissions.filter((p) => permIds.includes(p.id));
    return HttpResponse.json(permissions);
  }),

  /** POST /api/v1/roles/:roleId/permission - Add permission to role */
  http.post(`${BASE}/api/v1/roles/:roleId/permission`, async ({ params, request }) => {
    const roleId = params.roleId as string;
    const body = (await request.json()) as { permission_id: string };

    if (!mockRoles.find((r) => r.id === roleId)) {
      return HttpResponse.json({ message: "Role not found" }, { status: 404 });
    }

    if (!rolePermissions[roleId]) rolePermissions[roleId] = [];
    if (!rolePermissions[roleId].includes(body.permission_id)) {
      rolePermissions[roleId].push(body.permission_id);
    }

    return new HttpResponse(null, { status: 204 });
  }),

  /** DELETE /api/v1/roles/:roleId/permission - Remove permission from role */
  http.delete(`${BASE}/api/v1/roles/:roleId/permission`, ({ params, request }) => {
    const roleId = params.roleId as string;
    const url = new URL(request.url);
    const permissionId = url.searchParams.get("permission_id");

    if (!mockRoles.find((r) => r.id === roleId)) {
      return HttpResponse.json({ message: "Role not found" }, { status: 404 });
    }

    if (permissionId && rolePermissions[roleId]) {
      rolePermissions[roleId] = rolePermissions[roleId].filter((id) => id !== permissionId);
    }

    return new HttpResponse(null, { status: 204 });
  }),
];
