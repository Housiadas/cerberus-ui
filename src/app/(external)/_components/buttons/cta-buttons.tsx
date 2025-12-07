import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CTAButtons() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
      <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
        <Link prefetch={false} href="/auth/register">
          <Button size="lg" className="bg-background hover:bg-background/70 px-8 text-lg text-black">
            Register
          </Button>
        </Link>
        <Link prefetch={false} href="/more">
          <Button size="lg" variant="outline" className="px-8 text-lg text-white hover:bg-white/50">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
}
