// Conditionally renders children based on user permissions or roles.
// Usage: <PermissionGate permission="users:read">...</PermissionGate>
// Usage: <PermissionGate permissions={["users:read", "users:write"]} requireAll>...</PermissionGate>
// Usage: <PermissionGate roles={["admin"]}>...</PermissionGate>

"use client";

import type { ReactNode } from "react";

import { useAuthStore } from "@/stores/auth/auth-provider";

type PermissionGateProps = {
  /** Single permission to check */
  permission?: string;
  /** Multiple permissions to check (uses requireAll to determine AND/OR) */
  permissions?: string[];
  /** When true, all permissions must be present. Default: false (any match) */
  requireAll?: boolean;
  /** Role(s) to check (any match grants access) */
  roles?: string[];
  /** Content to render when access is denied */
  fallback?: ReactNode;
  children: ReactNode;
};

/** Renders children only when the user has the required permissions/roles */
export const PermissionGate = ({
  permission,
  permissions,
  requireAll = false,
  roles,
  fallback = null,
  children,
}: PermissionGateProps): ReactNode => {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated || !user) {
    return fallback;
  }

  // Check single permission
  if (permission && !user.permissions.includes(permission)) {
    return fallback;
  }

  // Check multiple permissions
  if (permissions && permissions.length > 0) {
    const hasAccess = requireAll
      ? permissions.every((p) => user.permissions.includes(p))
      : permissions.some((p) => user.permissions.includes(p));
    if (!hasAccess) return fallback;
  }

  // Check roles
  if (roles && roles.length > 0) {
    const hasRole = roles.some((r) => user.roles.includes(r));
    if (!hasRole) return fallback;
  }

  return children;
};
