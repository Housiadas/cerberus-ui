"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Permissions } from "@/lib/constants/permissions";

import { UsersTable } from "./_components/users-table";

export default function Users() {
  return (
    <AuthGuard permission={Permissions.USERS_READ}>
      <div className="flex flex-col gap-4 md:gap-6">
        <UsersTable />
      </div>
    </AuthGuard>
  );
}
