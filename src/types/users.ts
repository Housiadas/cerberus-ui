import { z } from "zod";

import { userSchema } from "@/types/auth";

// ---- Reuse User schema from auth ----

export type { User } from "@/types/auth";
export { userSchema } from "@/types/auth";

// ---- Pagination Metadata ----

/** Cursor-based pagination metadata schema */
export const metadataSchema = z.object({
  nextCursor: z.string().optional(),
  prevCursor: z.string().optional(),
  hasMore: z.boolean(),
  limit: z.number(),
});

export type Metadata = z.infer<typeof metadataSchema>;

// ---- User Page Result ----

/** Paginated user list response schema */
export const userPageResultSchema = z.object({
  data: z.array(userSchema),
  metadata: metadataSchema,
});

export type UserPageResult = z.infer<typeof userPageResultSchema>;

// ---- Query Parameters ----

/** Parameters for listing/searching users */
export const listUsersParamsSchema = z.object({
  cursor: z.string().optional(),
  limit: z.string().optional(),
  orderBy: z.string().optional(),
  user_id: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  start_created_date: z.string().optional(),
  end_created_date: z.string().optional(),
});

export type ListUsersParams = z.infer<typeof listUsersParamsSchema>;

// ---- Create User ----

/** Create user request schema (same as register) */
export const createUserReqSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    department: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export type CreateUserReq = z.infer<typeof createUserReqSchema>;

// ---- Update User (admin) ----

/** Update user request schema (admin can also set enabled) */
export const updateUserReqSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    department: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters").optional(),
    passwordConfirm: z.string().optional(),
    enabled: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.password !== data.passwordConfirm) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    },
  );

export type UpdateUserReq = z.infer<typeof updateUserReqSchema>;

// ---- Update Me (self-service) ----

/** Update current user's own profile schema */
export const updateMeReqSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    department: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters").optional(),
    passwordConfirm: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.password !== data.passwordConfirm) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    },
  );

export type UpdateMeReq = z.infer<typeof updateMeReqSchema>;

// ---- User Role Management ----

/** Add role to user request schema */
export const addUserRoleReqSchema = z.object({
  role_id: z.string().min(1, "Role ID is required"),
});

export type AddUserRoleReq = z.infer<typeof addUserRoleReqSchema>;
