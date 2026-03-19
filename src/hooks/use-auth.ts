// React Query hooks for authentication endpoints.
// Usage: import { useLogin, useRegister, ... } from '@/hooks/use-auth'

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  authForgotPassword,
  authLogin,
  authLogout,
  authRefresh,
  authRegister,
  authResetPassword,
} from "@/lib/api/auth";
import type {
  ApiError,
  ForgotPasswordReq,
  LoginReq,
  LogoutReq,
  RefreshTokenReq,
  RegisterReq,
  ResetPasswordReq,
  Token,
  User,
} from "@/types/auth";

/** Auth query key factory */
export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
};

/** Hook for user login. Returns token pair on success. */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<Token, ApiError, LoginReq>({
    mutationFn: authLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
};

/** Hook for user registration. Returns the created user. */
export const useRegister = () => {
  return useMutation<User, ApiError, RegisterReq>({
    mutationFn: authRegister,
  });
};

/** Hook for refreshing JWT tokens. */
export const useRefreshToken = () => {
  return useMutation<Token, ApiError, RefreshTokenReq>({
    mutationFn: authRefresh,
  });
};

/** Hook for user logout. Requires access token and refresh token. */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, LogoutReq & { accessToken: string }>({
    mutationFn: ({ accessToken, ...data }) => authLogout(data, accessToken),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

/** Hook for forgot password flow. Sends reset email. */
export const useForgotPassword = () => {
  return useMutation<void, ApiError, ForgotPasswordReq>({
    mutationFn: authForgotPassword,
  });
};

/** Hook for resetting password with a valid token. */
export const useResetPassword = () => {
  return useMutation<void, ApiError, ResetPasswordReq>({
    mutationFn: authResetPassword,
  });
};
