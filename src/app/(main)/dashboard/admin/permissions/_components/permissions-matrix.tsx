"use client";

import { useCallback, useState } from "react";

import { useQueries } from "@tanstack/react-query";
import { EllipsisVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { PermissionGate } from "@/components/auth/PermissionGate";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useListPermissions } from "@/hooks/use-permissions";
import { useAddRolePermission, useListRoles, useRemoveRolePermission } from "@/hooks/use-roles";
import { getRolePermissions } from "@/lib/api/roles";
import { Permissions } from "@/lib/constants/permissions";
import { useAuthStore } from "@/stores/auth/auth-provider";
import type { Permission } from "@/types/permissions";
import type { Role } from "@/types/roles";

import { CreatePermissionDialog } from "./create-permission-dialog";
import { CreateRoleDialog } from "./create-role-dialog";
import { DeletePermissionDialog } from "./delete-permission-dialog";
import { DeleteRoleDialog } from "./delete-role-dialog";
import { EditPermissionDialog } from "./edit-permission-dialog";
import { EditRoleDialog } from "./edit-role-dialog";

export function PermissionsMatrix(): React.ReactNode {
  const accessToken = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);
  const token = accessToken ?? "";

  const canEdit = user?.permissions.includes(Permissions.PERMISSIONS_EDIT) ?? false;

  // Fetch all roles and permissions
  const { data: rolesData, isLoading: rolesLoading } = useListRoles({}, token);
  const { data: permissionsData, isLoading: permissionsLoading } = useListPermissions({}, token);

  const roles = rolesData?.data ?? [];
  const permissions = permissionsData?.data ?? [];

  // Fetch per-role permissions using useQueries
  const rolePermissionQueries = useQueries({
    queries: roles.map((role) => ({
      queryKey: ["roles", "permissions", role.id] as const,
      queryFn: () => getRolePermissions(role.id, token),
      enabled: !!token && roles.length > 0,
    })),
    combine: (results) => {
      const map: Record<string, Set<string>> = {};
      for (let i = 0; i < results.length; i++) {
        const role = roles[i];
        const data = results[i].data;
        if (role && data) {
          map[role.id] = new Set(data.map((p) => p.id));
        }
      }
      return {
        data: map,
        isLoading: results.some((r) => r.isLoading),
      };
    },
  });

  const rolePermMap = rolePermissionQueries.data;
  const isLoading = rolesLoading || permissionsLoading || rolePermissionQueries.isLoading;

  // Mutations
  const addPermission = useAddRolePermission();
  const removePermission = useRemoveRolePermission();

  // Track pending toggles
  const [pendingCells, setPendingCells] = useState<Set<string>>(new Set());

  const handleToggle = useCallback(
    (roleId: string, permissionId: string, isAssigned: boolean) => {
      const cellKey = `${roleId}:${permissionId}`;
      setPendingCells((prev) => new Set(prev).add(cellKey));

      const onSettled = (): void => {
        setPendingCells((prev) => {
          const next = new Set(prev);
          next.delete(cellKey);
          return next;
        });
      };

      if (isAssigned) {
        removePermission.mutate(
          { roleId, permissionId, token },
          {
            onError: (error) => toast.error(error.message || "Failed to remove permission"),
            onSettled,
          },
        );
      } else {
        addPermission.mutate(
          { roleId, data: { permission_id: permissionId }, token },
          {
            onError: (error) => toast.error(error.message || "Failed to add permission"),
            onSettled,
          },
        );
      }
    },
    [token, addPermission, removePermission],
  );

  // Dialog state
  const [createRoleOpen, setCreateRoleOpen] = useState(false);
  const [createPermissionOpen, setCreatePermissionOpen] = useState(false);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [editPermission, setEditPermission] = useState<Permission | null>(null);
  const [deleteRole, setDeleteRole] = useState<Role | null>(null);
  const [deletePermission, setDeletePermission] = useState<Permission | null>(null);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-lg">Permissions Matrix</h2>
        <div className="flex gap-2">
          <PermissionGate permission={Permissions.ROLES_CREATE}>
            <Button variant="outline" size="sm" onClick={() => setCreateRoleOpen(true)}>
              <Plus className="mr-1 size-4" />
              Add Role
            </Button>
          </PermissionGate>
          <PermissionGate permission={Permissions.PERMISSIONS_EDIT}>
            <Button variant="outline" size="sm" onClick={() => setCreatePermissionOpen(true)}>
              <Plus className="mr-1 size-4" />
              Add Permission
            </Button>
          </PermissionGate>
        </div>
      </div>

      <div className="overflow-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Permission</TableHead>
              {roles.map((role) => (
                <TableHead key={role.id} className="min-w-[120px] text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span>{role.name}</span>
                    <PermissionGate permissions={[Permissions.ROLES_EDIT, Permissions.ROLES_DELETE]}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="size-6 text-muted-foreground">
                            <EllipsisVertical className="size-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                          <PermissionGate permission={Permissions.ROLES_EDIT}>
                            <DropdownMenuItem onClick={() => setEditRole(role)}>
                              <Pencil />
                              Edit
                            </DropdownMenuItem>
                          </PermissionGate>
                          <PermissionGate permission={Permissions.ROLES_DELETE}>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={() => setDeleteRole(role)}>
                              <Trash2 />
                              Delete
                            </DropdownMenuItem>
                          </PermissionGate>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </PermissionGate>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={roles.length + 1} className="h-24 text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : permissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={roles.length + 1} className="h-24 text-center text-muted-foreground">
                  No permissions found.
                </TableCell>
              </TableRow>
            ) : (
              permissions.map((perm) => (
                <TableRow key={perm.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center justify-between">
                      <span>{perm.name}</span>
                      <PermissionGate permissions={[Permissions.PERMISSIONS_EDIT]}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-6 text-muted-foreground">
                              <EllipsisVertical className="size-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem onClick={() => setEditPermission(perm)}>
                              <Pencil />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onClick={() => setDeletePermission(perm)}>
                              <Trash2 />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </PermissionGate>
                    </div>
                  </TableCell>
                  {roles.map((role) => {
                    const cellKey = `${role.id}:${perm.id}`;
                    const isAssigned = rolePermMap[role.id]?.has(perm.id) ?? false;
                    const isPending = pendingCells.has(cellKey);

                    return (
                      <TableCell key={cellKey} className="text-center">
                        <Checkbox
                          checked={isAssigned}
                          disabled={!canEdit || isPending}
                          onCheckedChange={() => handleToggle(role.id, perm.id, isAssigned)}
                          aria-label={`${perm.name} for ${role.name}`}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      <CreateRoleDialog open={createRoleOpen} onClose={() => setCreateRoleOpen(false)} />
      <CreatePermissionDialog open={createPermissionOpen} onClose={() => setCreatePermissionOpen(false)} />
      <EditRoleDialog role={editRole} onClose={() => setEditRole(null)} />
      <EditPermissionDialog permission={editPermission} onClose={() => setEditPermission(null)} />
      <DeleteRoleDialog role={deleteRole} onClose={() => setDeleteRole(null)} />
      <DeletePermissionDialog permission={deletePermission} onClose={() => setDeletePermission(null)} />
    </>
  );
}
