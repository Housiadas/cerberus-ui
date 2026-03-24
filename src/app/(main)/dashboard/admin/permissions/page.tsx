"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Permissions } from "@/lib/constants/permissions";

import { PermissionsMatrix } from "./_components/permissions-matrix";

export default function PermissionsPage(): React.ReactNode {
  return (
    <AuthGuard permission={Permissions.PERMISSIONS_READ}>
      <div className="flex flex-col gap-4 md:gap-6">
        <PermissionsMatrix />
      </div>
    </AuthGuard>
  );
}
