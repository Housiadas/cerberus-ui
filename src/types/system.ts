import { z } from "zod";

// ---- System Schemas ----

/** Readiness check response schema */
export const statusSchema = z.object({
  status: z.string(),
});

export type Status = z.infer<typeof statusSchema>;

/** Liveness check response schema */
export const infoSchema = z.object({
  status: z.string(),
  build: z.string(),
  host: z.string(),
  name: z.string(),
  podIp: z.string(),
  node: z.string(),
  namespace: z.string(),
  gomaxprocs: z.number(),
});

export type Info = z.infer<typeof infoSchema>;
