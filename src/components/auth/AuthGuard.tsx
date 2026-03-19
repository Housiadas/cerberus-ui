// Route-level authentication and authorization guard.
// Usage: Wrap page content in layouts to protect routes.
// <AuthGuard>...</AuthGuard> - requires authentication only
// <AuthGuard permission="admin:access">...</AuthGuard> - requires specific permission
// <AuthGuard roles={["admin"]}>...</AuthGuard> - requires specific role

"use client";

import type { ReactNode } from "react";

import { useRouter } from "next/navigation";

import { AuthRoutes } from "@/lib/constants";
import { useAuthStore } from "@/stores/auth/auth-provider";

type AuthGuardProps = {
  /** Single permission required to access the route */
  permission?: string;
  /** Multiple permissions required (uses requireAll) */
  permissions?: string[];
  /** When true, all permissions must be present. Default: false */
  requireAll?: boolean;
  /** Role(s) required (any match grants access) */
  roles?: string[];
  /** URL to redirect to when unauthorized. Defaults to /unauthorized */
  unauthorizedRedirect?: string;
  children: ReactNode;
};

/** Protects route content by checking authentication and optional permissions/roles */
export const AuthGuard = ({
  permission,
  permissions,
  requireAll = false,
  roles,
  unauthorizedRedirect = "/unauthorized",
  children,
}: AuthGuardProps): ReactNode => {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const user = useAuthStore((s) => s.user);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    router.replace(AuthRoutes.LOGIN);
    return null;
  }

  // Check single permission
  if (permission && !user.permissions.includes(permission)) {
    router.replace(unauthorizedRedirect);
    return null;
  }

  // Check multiple permissions
  if (permissions && permissions.length > 0) {
    const hasAccess = requireAll
      ? permissions.every((p) => user.permissions.includes(p))
      : permissions.some((p) => user.permissions.includes(p));
    if (!hasAccess) {
      router.replace(unauthorizedRedirect);
      return null;
    }
  }

  // Check roles
  if (roles && roles.length > 0) {
    const hasRole = roles.some((r) => user.roles.includes(r));
    if (!hasRole) {
      router.replace(unauthorizedRedirect);
      return null;
    }
  }

  return children;
};
