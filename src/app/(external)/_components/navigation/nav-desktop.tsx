import Link from "next/link";

import { PublicRoutes } from "@/lib/constants";

export function NavDesktop() {
  return (
    <div className="hidden items-center space-x-8 md:flex">
      <Link
        prefetch={false}
        href={PublicRoutes.SUBSCRIPTION}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Subscription
      </Link>
      <Link
        prefetch={false}
        href={PublicRoutes.MORE}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        Docs
      </Link>
      <Link
        prefetch={false}
        href={PublicRoutes.ABOUT}
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        About
      </Link>
    </div>
  );
}
