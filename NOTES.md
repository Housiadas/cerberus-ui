## Features

- Built with Next.js 16, TypeScript, Tailwind CSS v4, and Shadcn UI
- Responsive and mobile-friendly
- Flexible layouts (collapsible sidebar, variable content widths)
- Authentication flows and screens
- Prebuilt dashboards (Default, CRM, Finance) with more coming soon


## RBAC Usage examples
```
// Wrap a route layout with auth guard
<AuthGuard permission="finance:read">
<FinanceDashboard />
</AuthGuard>

// Conditionally render UI elements
<PermissionGate permission="users:delete" fallback={<span>No access</span>}>
<DeleteButton />
</PermissionGate>

// Check permissions in hooks
const canEdit = useHasPermission("users:edit");
const isAdmin = useHasRole("admin");
```
