"use client";

import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

import { PermissionGate } from "@/components/auth/PermissionGate";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Permissions } from "@/lib/constants/permissions";
import type { User } from "@/types/auth";

type UserActionsProps = {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export function UserActions({ user, onEdit, onDelete }: UserActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 text-muted-foreground">
          <EllipsisVertical />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        <PermissionGate permission={Permissions.USERS_EDIT}>
          <DropdownMenuItem onClick={() => onEdit(user)}>
            <Pencil />
            Edit
          </DropdownMenuItem>
        </PermissionGate>
        <PermissionGate permission={Permissions.USERS_DELETE}>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={() => onDelete(user)}>
            <Trash2 />
            Delete
          </DropdownMenuItem>
        </PermissionGate>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
