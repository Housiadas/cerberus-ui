"use client";

import { toast } from "sonner";

import { Switch } from "@/components/ui/switch";
import { useUpdateUser } from "@/hooks/use-users";
import { useAuthStore } from "@/stores/auth/auth-provider";
import type { User } from "@/types/auth";

export function UserEnabledToggle({ user }: { user: User }) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const update = useUpdateUser(accessToken ?? "");

  const handleToggle = (checked: boolean): void => {
    update.mutate(
      { userId: user.id, data: { enabled: checked } },
      {
        onError: (error) => {
          toast.error(error.message || "Failed to update user");
        },
      },
    );
  };

  return (
    <Switch
      checked={user.enabled}
      onCheckedChange={handleToggle}
      disabled={update.isPending}
      aria-label={`Toggle ${user.name}`}
    />
  );
}
