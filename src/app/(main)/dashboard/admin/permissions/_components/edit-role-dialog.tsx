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
import { useUpdateRole } from "@/hooks/use-roles";
import { useAuthStore } from "@/stores/auth/auth-provider";
import type { Role } from "@/types/roles";
import { type UpdateRole, updateRoleSchema } from "@/types/roles";

type EditRoleDialogProps = {
  role: Role | null;
  onClose: () => void;
};

export function EditRoleDialog({ role, onClose }: EditRoleDialogProps): React.ReactNode {
  const accessToken = useAuthStore((s) => s.accessToken);
  const updateMutation = useUpdateRole();

  const form = useForm<UpdateRole>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (role) {
      form.reset({ name: role.name });
    }
  }, [role, form]);

  const onSubmit = (data: UpdateRole): void => {
    if (!role) return;
    updateMutation.mutate(
      { roleId: role.id, data, token: accessToken ?? "" },
      {
        onSuccess: () => {
          toast.success("Role updated");
          onClose();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update role");
        },
      },
    );
  };

  return (
    <Dialog open={!!role} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Role</DialogTitle>
          <DialogDescription>Update the role name.</DialogDescription>
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
