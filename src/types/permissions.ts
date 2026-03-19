import { z } from "zod";

import { metadataSchema } from "@/types/users";

// ---- Permission Schema ----

/** Permission response schema */
export const permissionSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Permission = z.infer<typeof permissionSchema>;

// ---- Permission Page Result ----

/** Paginated permission list response schema */
export const permissionPageResultSchema = z.object({
  data: z.array(permissionSchema),
  metadata: metadataSchema,
});

export type PermissionPageResult = z.infer<typeof permissionPageResultSchema>;

// ---- Query Parameters ----

/** Parameters for listing/searching permissions */
export const listPermissionsParamsSchema = z.object({
  cursor: z.string().optional(),
  limit: z.string().optional(),
  orderBy: z.string().optional(),
  permission_id: z.string().optional(),
  name: z.string().optional(),
});

export type ListPermissionsParams = z.infer<typeof listPermissionsParamsSchema>;

// ---- Create Permission ----

/** Create permission request schema */
export const newPermissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type NewPermission = z.infer<typeof newPermissionSchema>;

// ---- Update Permission ----

/** Update permission request schema */
export const updatePermissionSchema = z.object({
  name: z.string().optional(),
});

export type UpdatePermission = z.infer<typeof updatePermissionSchema>;
