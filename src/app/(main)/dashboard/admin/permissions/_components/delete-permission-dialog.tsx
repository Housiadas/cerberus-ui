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
import { useDeletePermission } from "@/hooks/use-permissions";
import { useAuthStore } from "@/stores/auth/auth-provider";
import type { Permission } from "@/types/permissions";

type DeletePermissionDialogProps = {
  permission: Permission | null;
  onClose: () => void;
};

export function DeletePermissionDialog({ permission, onClose }: DeletePermissionDialogProps): React.ReactNode {
  const accessToken = useAuthStore((s) => s.accessToken);
  const deleteMutation = useDeletePermission();

  const handleDelete = (): void => {
    if (!permission) return;
    deleteMutation.mutate(
      { permissionId: permission.id, token: accessToken ?? "" },
      {
        onSuccess: () => {
          toast.success(`Permission "${permission.name}" deleted`);
          onClose();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to delete permission");
        },
      },
    );
  };

  return (
    <AlertDialog open={!!permission} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete permission</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{permission?.name}</strong>? This action cannot be undone.
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
