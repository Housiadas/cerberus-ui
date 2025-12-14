import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PublicRoutes } from "@/navigation/routes";

export function NavMobile() {
  return (
    <div className="space-y-3 border-border border-zinc-800 border-t py-4 md:hidden">
      <Link prefetch={false} href={PublicRoutes.PRICE} className="block py-2 text-gray-400 hover:text-white">
        Pricing
      </Link>
      <Link prefetch={false} href={PublicRoutes.MORE} className="block py-2 text-gray-400 hover:text-white">
        Docs
      </Link>
      <Link prefetch={false} href={PublicRoutes.ABOUT} className="block py-2 text-gray-400 hover:text-white">
        About
      </Link>
      <div className="space-y-2 pt-4">
        <Button variant="outline" className="w-full text-white hover:bg-white/10">
          Login
        </Button>
        <Button className="w-full bg-[oklch(0.6723_0.1606_244.9955)] text-black text-white hover:bg-[oklch(0.6723_0.1606_244.9955)]/90">
          Register
        </Button>
      </div>
    </div>
  );
}
