"use client";

import { AuthGuard } from "@/components/auth/AuthGuard";

import { ChangePasswordForm } from "./_components/change-password-form";
import { ProfileDetailsForm } from "./_components/profile-details-form";

export default function ProfilePage(): React.ReactNode {
  return (
    <AuthGuard>
      <div className="flex flex-col gap-6">
        <h2 className="font-medium text-lg">Profile</h2>
        <ProfileDetailsForm />
        <ChangePasswordForm />
      </div>
    </AuthGuard>
  );
}
