import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[oklch(0.6723_0.1606_244.9955)]/20 to-transparent p-12 text-center md:p-16">
        <h2 className="mb-6 font-bold text-3xl text-white md:text-5xl">Ready to Get Started?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-gray-400 text-xl">
          Join thousands of developers building the future with our platform.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-[oklch(0.6723_0.1606_244.9955)] px-8 text-lg text-white hover:bg-[oklch(0.6723_0.1606_244.9955)]/90"
          >
            Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/20 px-8 text-lg text-white hover:bg-white/10">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
}
