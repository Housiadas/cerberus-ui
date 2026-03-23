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
import { useDeleteUser } from "@/hooks/use-users";
import { useAuthStore } from "@/stores/auth/auth-provider";
import type { User } from "@/types/auth";

type DeleteUserDialogProps = {
  user: User | null;
  onClose: () => void;
};

export function DeleteUserDialog({ user, onClose }: DeleteUserDialogProps) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const deleteMutation = useDeleteUser(accessToken ?? "");

  const handleDelete = (): void => {
    if (!user) return;
    deleteMutation.mutate(user.id, {
      onSuccess: () => {
        toast.success(`${user.name} deleted`);
        onClose();
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete user");
      },
    });
  };

  return (
    <AlertDialog open={!!user} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete user</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{user?.name}</strong>? This action cannot be undone.
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
