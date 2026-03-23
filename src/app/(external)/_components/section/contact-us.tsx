import Link from "next/link";

import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthRoutes } from "@/lib/constants";

export function ContactSection() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-12 text-center md:p-16">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <h2 className="mb-4 font-bold text-3xl text-foreground md:text-5xl">Ready to Get Started?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Join thousands of developers building the future with our platform. Start your free trial today.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link prefetch={false} href={AuthRoutes.REGISTER}>
            <Button size="lg" className="px-8 text-lg">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-8 text-lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
}
