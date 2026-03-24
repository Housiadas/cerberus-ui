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
import { useCreatePermission } from "@/hooks/use-permissions";
import { useAuthStore } from "@/stores/auth/auth-provider";
import { type NewPermission, newPermissionSchema } from "@/types/permissions";

type CreatePermissionDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function CreatePermissionDialog({ open, onClose }: CreatePermissionDialogProps): React.ReactNode {
  const accessToken = useAuthStore((s) => s.accessToken);
  const createMutation = useCreatePermission();

  const form = useForm<NewPermission>({
    resolver: zodResolver(newPermissionSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (data: NewPermission): void => {
    createMutation.mutate(
      { ...data, token: accessToken ?? "" },
      {
        onSuccess: () => {
          toast.success("Permission created");
          form.reset();
          onClose();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create permission");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Permission</DialogTitle>
          <DialogDescription>Add a new permission to the system.</DialogDescription>
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
                    <Input placeholder="e.g. reports:read" {...field} />
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
