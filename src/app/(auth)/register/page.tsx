import Link from "next/link";

import { AuthRoutes } from "@/lib/constants";

import { GoogleButton, RegisterForm } from "../_components";

export default function Register() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="w-full max-w-md space-y-10 p-8">
        <div className="space-y-4 text-center">
          <div className="font-medium tracking-tight">Register</div>
          <div className="mx-auto max-w-xl text-muted-foreground">
            Fill in your details below. We promise not to quiz you about your first pet&apos;s name (this time).
          </div>
        </div>
        <div className="space-y-4">
          <RegisterForm />
          <GoogleButton className="w-full" variant="outline" />
          <p className="text-center text-muted-foreground text-xs">
            Already have an account?{" "}
            <Link prefetch={false} href={AuthRoutes.LOGIN} className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
