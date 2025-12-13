import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthRoutes } from "@/navigation/routes";

export function CTAButtons() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
      <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
        <Link prefetch={false} href={AuthRoutes.REGISTER}>
          <Button
            size="lg"
            className="bg-[oklch(0.6723_0.1606_244.9955)] px-8 text-lg text-black text-white hover:bg-[oklch(0.6723_0.1606_244.9955)]/90"
          >
            Register <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        <Link prefetch={false} href={AuthRoutes.LOGIN}>
          <Button size="lg" variant="outline" className="px-8 text-lg text-white hover:bg-white/50">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}
