import Link from "next/link";

import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <div className="hidden items-center space-x-4 md:flex">
      <Link prefetch={false} href="/auth/login">
        <Button variant="outline" className="text-white hover:bg-white/50">
          Login
        </Button>
      </Link>
      <Link prefetch={false} href="/auth/register">
        <Button className="bg-background hover:bg-background/70 w-full text-black">Register</Button>
      </Link>
    </div>
  );
}
