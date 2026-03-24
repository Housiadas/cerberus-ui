"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdatePermission } from "@/hooks/use-permissions";
import { useAuthStore } from "@/stores/auth/auth-provider";
import type { Permission } from "@/types/permissions";
import { type UpdatePermission, updatePermissionSchema } from "@/types/permissions";

type EditPermissionDialogProps = {
  permission: Permission | null;
  onClose: () => void;
};

export function EditPermissionDialog({ permission, onClose }: EditPermissionDialogProps): React.ReactNode {
  const accessToken = useAuthStore((s) => s.accessToken);
  const updateMutation = useUpdatePermission();

  const form = useForm<UpdatePermission>({
    resolver: zodResolver(updatePermissionSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (permission) {
      form.reset({ name: permission.name });
    }
  }, [permission, form]);

  const onSubmit = (data: UpdatePermission): void => {
    if (!permission) return;
    updateMutation.mutate(
      { permissionId: permission.id, data, token: accessToken ?? "" },
      {
        onSuccess: () => {
          toast.success("Permission updated");
          onClose();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update permission");
        },
      },
    );
  };

  return (
    <Dialog open={!!permission} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Permission</DialogTitle>
          <DialogDescription>Update the permission name.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
