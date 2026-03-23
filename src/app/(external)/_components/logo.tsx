import Link from "next/link";

import { Command } from "lucide-react";

import { APP_CONFIG } from "@/config";
import { PublicRoutes } from "@/lib/constants";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <Command className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="font-bold text-foreground text-xl">
        <Link prefetch={false} href={PublicRoutes.HOME}>
          {APP_CONFIG.name}
        </Link>
      </span>
    </div>
  );
}
