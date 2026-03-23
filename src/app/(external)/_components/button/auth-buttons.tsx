import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AuthRoutes } from "@/lib/constants";

export function AuthButtons() {
  return (
    <div className="hidden items-center space-x-4 md:flex">
      <Link prefetch={false} href={AuthRoutes.LOGIN}>
        <Button variant="outline">Login</Button>
      </Link>
      <Link prefetch={false} href={AuthRoutes.REGISTER}>
        <Button>Register</Button>
      </Link>
    </div>
  );
}
