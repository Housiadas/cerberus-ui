"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserPen } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useUpdateUser } from "@/hooks/use-users";
import { useAuthStore } from "@/stores/auth/auth-provider";
import type { User } from "@/types/auth";

const editUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  department: z.string().optional(),
  enabled: z.boolean(),
});

type EditUserValues = z.infer<typeof editUserSchema>;

type UserDrawerProps = {
  user: User | null;
  onClose: () => void;
};

export function UserDrawer({ user, onClose }: UserDrawerProps) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const update = useUpdateUser(accessToken ?? "");

  const form = useForm<EditUserValues>({
    resolver: zodResolver(editUserSchema),
    defaultValues: { name: "", email: "", department: "", enabled: true },
  });

  useEffect(() => {
    if (user) {
      form.reset({ name: user.name, email: user.email, department: user.department ?? "", enabled: user.enabled });
    }
  }, [user, form]);

  const onSubmit = (data: EditUserValues): void => {
    if (!user) return;
    update.mutate(
      { userId: user.id, data },
      {
        onSuccess: () => {
          toast.success("User updated");
          onClose();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update user");
        },
      },
    );
  };

  return (
    <Sheet open={!!user} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <UserPen className="size-5" /> Edit User
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 px-4">
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enabled"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} id="enabled" />
                    </FormControl>
                    <Label htmlFor="enabled">Enabled</Label>
                  </div>
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit" disabled={update.isPending}>
                {update.isPending ? "Saving..." : "Save"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
