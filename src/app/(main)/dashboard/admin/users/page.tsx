"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";
import { Permissions } from "@/lib/constants/permissions";

import rawData from "./_components/data.json";
import { DataTable } from "./_components/data-table";
import { sectionSchema } from "./_components/schema";

const data = rawData.map((item) => sectionSchema.parse(item));

export default function Users() {
  return (
    <AuthGuard permission={Permissions.USERS_READ}>
      <div className="@container/main flex flex-col gap-4 md:gap-6">
        <DataTable data={data} />
      </div>
    </AuthGuard>
  );
}
