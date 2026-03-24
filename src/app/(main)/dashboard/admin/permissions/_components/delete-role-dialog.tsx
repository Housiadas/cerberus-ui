"use client";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteRole } from "@/hooks/use-roles";
import { useAuthStore } from "@/stores/auth/auth-provider";
import type { Role } from "@/types/roles";

type DeleteRoleDialogProps = {
  role: Role | null;
  onClose: () => void;
};

export function DeleteRoleDialog({ role, onClose }: DeleteRoleDialogProps): React.ReactNode {
  const accessToken = useAuthStore((s) => s.accessToken);
  const deleteMutation = useDeleteRole();

  const handleDelete = (): void => {
    if (!role) return;
    deleteMutation.mutate(
      { roleId: role.id, token: accessToken ?? "" },
      {
        onSuccess: () => {
          toast.success(`Role "${role.name}" deleted`);
          onClose();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to delete role");
        },
      },
    );
  };

  return (
    <AlertDialog open={!!role} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete role</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{role?.name}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
