import { z } from "zod";

// ---- Zod Schemas ----

/** Login request schema */
export const loginReqSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

/** Register (new user) request schema */
export const registerReqSchema = z
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

/** Refresh token request schema */
export const refreshTokenReqSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

/** Logout request schema */
export const logoutReqSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

/** Forgot password request schema */
export const forgotPasswordReqSchema = z.object({
  email: z.string().email("Invalid email address"),
});

/** Reset password request schema */
export const resetPasswordReqSchema = z
  .object({
    token: z.string().min(1, "Token is required"),
    oldPassword: z.string().min(1, "Old password is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

/** Token response schema */
export const tokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
});

/** User response schema */
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  department: z.string().optional(),
  enabled: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/** API error schema */
export const apiErrorSchema = z.object({
  status: z.string().optional(),
  code: z.string().optional(),
  message: z.string().optional(),
  fields: z
    .array(
      z.object({
        field: z.string().optional(),
        error: z.string().optional(),
      }),
    )
    .optional(),
});

// ---- TypeScript Types (inferred from Zod) ----

export type LoginReq = z.infer<typeof loginReqSchema>;
export type RegisterReq = z.infer<typeof registerReqSchema>;
export type RefreshTokenReq = z.infer<typeof refreshTokenReqSchema>;
export type LogoutReq = z.infer<typeof logoutReqSchema>;
export type ForgotPasswordReq = z.infer<typeof forgotPasswordReqSchema>;
export type ResetPasswordReq = z.infer<typeof resetPasswordReqSchema>;
export type Token = z.infer<typeof tokenSchema>;
export type User = z.infer<typeof userSchema>;
export type ApiError = z.infer<typeof apiErrorSchema>;
