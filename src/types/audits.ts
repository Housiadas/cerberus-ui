import { z } from "zod";

import { metadataSchema } from "@/types/users";

// ---- Audit Schema ----

/** Audit log entry response schema */
export const auditSchema = z.object({
  id: z.string(),
  objId: z.string(),
  objEntity: z.string(),
  objName: z.string(),
  actorId: z.string(),
  action: z.string(),
  data: z.string(),
  message: z.string(),
  timestamp: z.string(),
});

export type Audit = z.infer<typeof auditSchema>;

// ---- Audit Page Result ----

/** Paginated audit list response schema */
export const auditPageResultSchema = z.object({
  data: z.array(auditSchema),
  metadata: metadataSchema,
});

export type AuditPageResult = z.infer<typeof auditPageResultSchema>;

// ---- Query Parameters ----

/** Parameters for listing/searching audits */
export const listAuditsParamsSchema = z.object({
  cursor: z.string().optional(),
  limit: z.string().optional(),
  orderBy: z.string().optional(),
  obj_id: z.string().optional(),
  obj_domain: z.string().optional(),
  obj_name: z.string().optional(),
  actor_id: z.string().optional(),
  action: z.string().optional(),
  since: z.string().optional(),
  until: z.string().optional(),
});

export type ListAuditsParams = z.infer<typeof listAuditsParamsSchema>;
