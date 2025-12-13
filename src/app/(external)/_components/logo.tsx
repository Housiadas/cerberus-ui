import Link from "next/link";

import { Command } from "lucide-react";

import { APP_CONFIG } from "@/config/app-config";
import { PublicRoutes } from "@/navigation/routes";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
        <Command className="text-primary-foreground h-5 w-5" />
      </div>
      <span className="text-xl font-bold text-white">
        <Link prefetch={false} href={PublicRoutes.HOME}>
          {APP_CONFIG.name}
        </Link>
      </span>
    </div>
  );
}
