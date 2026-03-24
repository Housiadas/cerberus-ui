"use client";

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
import { useCreateRole } from "@/hooks/use-roles";
import { useAuthStore } from "@/stores/auth/auth-provider";
import { type NewRole, newRoleSchema } from "@/types/roles";

type CreateRoleDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateRoleDialog({ open, onClose }: CreateRoleDialogProps): React.ReactNode {
  const accessToken = useAuthStore((s) => s.accessToken);
  const createMutation = useCreateRole();

  const form = useForm<NewRole>({
    resolver: zodResolver(newRoleSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (data: NewRole): void => {
    createMutation.mutate(
      { ...data, token: accessToken ?? "" },
      {
        onSuccess: () => {
          toast.success("Role created");
          form.reset();
          onClose();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create role");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Role</DialogTitle>
          <DialogDescription>Add a new role to the system.</DialogDescription>
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
                    <Input placeholder="e.g. manager" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
