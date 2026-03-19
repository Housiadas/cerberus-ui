"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";

import rawData from "./_components/data.json";
import { DataTable } from "./_components/data-table";
import { sectionSchema } from "./_components/schema";

const data = rawData.map((item) => sectionSchema.parse(item));

export default function Users() {
  return (
    <AuthGuard permission="users:read">
      <div className="@container/main flex flex-col gap-4 md:gap-6">
        <DataTable data={data} />
      </div>
    </AuthGuard>
  );
}
