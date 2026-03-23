"use client";

import { useState } from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useListUsers } from "@/hooks/use-users";
import { useAuthStore } from "@/stores/auth/auth-provider";
import type { User } from "@/types/auth";

import { DeleteUserDialog } from "./delete-user-dialog";
import { UserActions } from "./user-actions";
import { UserDrawer } from "./user-drawer";
import { UserEnabledToggle } from "./user-enabled-toggle";

export function UsersTable() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const [search, setSearch] = useState("");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const searchQuery = search.length >= 3 ? search : undefined;
  const { data, isLoading } = useListUsers({ name: searchQuery, email: searchQuery }, accessToken ?? "");

  const users = data?.data ?? [];

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-lg">Users</h2>
        <div className="relative w-64">
          <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Enabled</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.department ?? "—"}</TableCell>
                  <TableCell>
                    <UserEnabledToggle user={user} />
                  </TableCell>
                  <TableCell>
                    <UserActions user={user} onEdit={setEditUser} onDelete={setDeleteUser} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <UserDrawer user={editUser} onClose={() => setEditUser(null)} />
      <DeleteUserDialog user={deleteUser} onClose={() => setDeleteUser(null)} />
    </>
  );
}
