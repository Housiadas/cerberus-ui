import Link from "next/link";

import { PublicRoutes } from "@/lib/constants";

export function NavDesktop() {
  return (
    <div className="hidden items-center space-x-8 md:flex">
      <Link prefetch={false} href={PublicRoutes.PRICE} className="text-gray-400 transition-colors hover:text-white">
        Pricing
      </Link>
      <Link prefetch={false} href={PublicRoutes.MORE} className="text-gray-400 transition-colors hover:text-white">
        Docs
      </Link>
      <Link prefetch={false} href={PublicRoutes.ABOUT} className="text-gray-400 transition-colors hover:text-white">
        About
      </Link>
    </div>
  );
}
