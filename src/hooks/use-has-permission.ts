// Hook for checking if the current user has a specific permission or role.
// Usage: const canRead = useHasPermission('users:read')
// Usage: const isAdmin = useHasRole('admin')

import { useAuthStore } from "@/stores/auth/auth-provider";

/** Returns true if the current user has the given permission string */
export const useHasPermission = (permission: string): boolean => {
  const user = useAuthStore((s) => s.user);
  return user?.permissions.includes(permission) ?? false;
};

/** Returns true if the current user has ALL of the given permissions */
export const useHasAllPermissions = (required: string[]): boolean => {
  const user = useAuthStore((s) => s.user);
  if (!user) return false;
  return required.every((p) => user.permissions.includes(p));
};

/** Returns true if the current user has ANY of the given permissions */
export const useHasAnyPermission = (required: string[]): boolean => {
  const user = useAuthStore((s) => s.user);
  if (!user) return false;
  return required.some((p) => user.permissions.includes(p));
};

/** Returns true if the current user has the given role */
export const useHasRole = (role: string): boolean => {
  const user = useAuthStore((s) => s.user);
  return user?.roles.includes(role) ?? false;
};

/** Returns true if the current user has ANY of the given roles */
export const useHasAnyRole = (required: string[]): boolean => {
  const user = useAuthStore((s) => s.user);
  if (!user) return false;
  return required.some((r) => user.roles.includes(r));
};
