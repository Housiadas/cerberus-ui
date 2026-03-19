/** Centralized permission constants using "resource:action" format. */

export const Permissions = {
  // Users
  USERS_CREATE: "users:create",
  USERS_READ: "users:read",
  USERS_EDIT: "users:edit",
  USERS_DELETE: "users:delete",

  // Roles
  ROLES_CREATE: "roles:create",
  ROLES_READ: "roles:read",
  ROLES_EDIT: "roles:edit",
  ROLES_DELETE: "roles:delete",

  // Permissions
  PERMISSIONS_READ: "permissions:read",
  PERMISSIONS_EDIT: "permissions:edit",

  // Dashboard
  DASHBOARD_VIEW: "dashboard:view",
  DASHBOARD_ADMIN: "dashboard:admin",

  // Finance
  FINANCE_READ: "finance:read",
  FINANCE_WRITE: "finance:write",

  // CRM
  CRM_READ: "crm:read",
  CRM_WRITE: "crm:write",

  // Analytics
  ANALYTICS_READ: "analytics:read",
  ANALYTICS_WRITE: "analytics:write",

  // Audit
  AUDIT_READ: "audit:read",

  // Billing
  BILLING_READ: "billing:read",
  BILLING_WRITE: "billing:write",

  // System
  SYSTEM_READ: "system:read",
  SYSTEM_WRITE: "system:write",
} as const;

export type Permission = (typeof Permissions)[keyof typeof Permissions];
