import Link from "next/link";

import { AuthRoutes } from "@/lib/constants";

import { ForgotPasswordForm } from "../_components";

export default function ForgotPassword() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="w-full max-w-md space-y-10 p-8">
        <div className="space-y-4 text-center">
          <div className="font-medium tracking-tight">Forgot Password</div>
          <div className="mx-auto max-w-xl text-muted-foreground">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </div>
        </div>
        <div className="space-y-4">
          <ForgotPasswordForm />
          <p className="text-center text-muted-foreground text-xs">
            Remember your password?{" "}
            <Link prefetch={false} href={AuthRoutes.LOGIN} className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
