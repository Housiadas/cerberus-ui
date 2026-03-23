import { z } from "zod";

import { metadataSchema } from "@/types/users";

// ---- Role Schema ----

/** Role response schema */
export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Role = z.infer<typeof roleSchema>;

// ---- Role Page Result ----

/** Paginated role list response schema */
export const rolePageResultSchema = z.object({
  data: z.array(roleSchema),
  metadata: metadataSchema,
});

export type RolePageResult = z.infer<typeof rolePageResultSchema>;

// ---- Query Parameters ----

/** Parameters for listing/searching roles */
export const listRolesParamsSchema = z.object({
  cursor: z.string().optional(),
  limit: z.string().optional(),
  orderBy: z.string().optional(),
  role_id: z.string().optional(),
  name: z.string().optional(),
});

export type ListRolesParams = z.infer<typeof listRolesParamsSchema>;

// ---- Create Role ----

/** Create role request schema */
export const newRoleSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type NewRole = z.infer<typeof newRoleSchema>;

// ---- Update Role ----

/** Update role request schema */
export const updateRoleSchema = z.object({
  name: z.string().optional(),
});

export type UpdateRole = z.infer<typeof updateRoleSchema>;

// ---- Role Permission Management ----

/** Add permission to role request schema */
export const addRolePermissionReqSchema = z.object({
  permission_id: z.string().min(1, "Permission ID is required"),
});

export type AddRolePermissionReq = z.infer<typeof addRolePermissionReqSchema>;
