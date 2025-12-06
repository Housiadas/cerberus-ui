import { z } from "zod";

export const sectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  department: z.string(),
  status: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
