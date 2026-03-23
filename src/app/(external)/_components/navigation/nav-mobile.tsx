import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AuthRoutes, PublicRoutes } from "@/lib/constants";

export function NavMobile() {
  return (
    <div className="space-y-3 border-t border-border py-4 md:hidden">
      <Link
        prefetch={false}
        href={PublicRoutes.SUBSCRIPTION}
        className="block py-2 text-muted-foreground hover:text-foreground"
      >
        Subscription
      </Link>
      <Link
        prefetch={false}
        href={PublicRoutes.MORE}
        className="block py-2 text-muted-foreground hover:text-foreground"
      >
        Docs
      </Link>
      <Link
        prefetch={false}
        href={PublicRoutes.ABOUT}
        className="block py-2 text-muted-foreground hover:text-foreground"
      >
        About
      </Link>
      <div className="space-y-2 pt-4">
        <Link prefetch={false} href={AuthRoutes.LOGIN}>
          <Button variant="outline" className="w-full">
            Login
          </Button>
        </Link>
        <Link prefetch={false} href={AuthRoutes.REGISTER}>
          <Button className="w-full">Register</Button>
        </Link>
      </div>
    </div>
  );
}
