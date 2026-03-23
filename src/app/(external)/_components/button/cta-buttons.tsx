import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthRoutes, PublicRoutes } from "@/lib/constants";

export function CTAButtons() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
      <Link prefetch={false} href={AuthRoutes.REGISTER}>
        <Button size="lg" className="px-8 text-lg">
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
      <Link prefetch={false} href={PublicRoutes.MORE}>
        <Button size="lg" variant="outline" className="px-8 text-lg">
          Learn More
        </Button>
      </Link>
    </div>
  );
}
