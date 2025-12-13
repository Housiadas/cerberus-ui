import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AuthRoutes } from "@/navigation/routes";

export function AuthButtons() {
  return (
    <div className="hidden items-center space-x-4 md:flex">
      <Link prefetch={false} href={AuthRoutes.LOGIN}>
        <Button variant="outline" className="text-white hover:bg-white/50">
          Login
        </Button>
      </Link>
      <Link prefetch={false} href={AuthRoutes.REGISTER}>
        <Button className="w-full bg-[oklch(0.6723_0.1606_244.9955)] text-white hover:bg-[oklch(0.6723_0.1606_244.9955)]/90">
          Register
        </Button>
      </Link>
    </div>
  );
}
