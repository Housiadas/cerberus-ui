import Link from "next/link";

import { AuthRoutes } from "@/lib/constants";
import { MOCK_CREDENTIALS } from "@/mocks/jwt";

import { GoogleButton, LoginForm } from "../_components";

export default function Login() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <div className="w-full max-w-md space-y-10 p-8">
        <div className="space-y-4 text-center">
          <div className="font-medium tracking-tight">Login</div>
          <div className="mx-auto max-w-xl text-muted-foreground">
            Welcome back. Enter your email and password, let&apos;s hope you remember them this time.
          </div>
        </div>
        <div className="space-y-4">
          <LoginForm />
          <GoogleButton className="w-full" variant="outline" />
          <div className="flex items-center justify-between text-xs">
            <p className="text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link prefetch={false} href={AuthRoutes.REGISTER} className="text-primary">
                Register
              </Link>
            </p>
            <Link prefetch={false} href={AuthRoutes.FORGOT_PASSWORD} className="text-primary">
              Forgot Password?
            </Link>
          </div>
          {process.env.NODE_ENV === "development" && (
            <div className="rounded-md border border-muted-foreground/30 border-dashed p-3 text-muted-foreground text-xs">
              <p className="mb-1 font-medium">Dev Credentials</p>
              <p>Email: {MOCK_CREDENTIALS.email}</p>
              <p>Password: {MOCK_CREDENTIALS.password}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
