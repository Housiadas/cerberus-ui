import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge, ContactSection, SubscriptionsSection } from "../_components";

export const metadata = {
  title: "Subscription",
};

const faqs = [
  {
    question: "Can I change plans later?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, all paid plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. Enterprise customers can also pay via invoice.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. There are no long-term contracts. You can cancel your subscription at any time from your account settings.",
  },
];

const comparison = [
  { feature: "Projects", starter: "1", professional: "Unlimited", enterprise: "Unlimited" },
  { feature: "Storage", starter: "5GB", professional: "50GB", enterprise: "Unlimited" },
  { feature: "API Calls", starter: "10K/mo", professional: "100K/mo", enterprise: "Unlimited" },
  { feature: "Team Members", starter: "1", professional: "5", enterprise: "Unlimited" },
  { feature: "Support", starter: "Community", professional: "Email", enterprise: "24/7 Priority" },
];

export default function SubscriptionPage() {
  return (
    <>
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="space-y-6 text-center">
          <Badge title="Simple, Transparent Pricing" />
          <h1 className="font-bold text-4xl text-foreground leading-tight md:text-6xl">
            Choose the Perfect Plan
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              for Your Needs
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-muted-foreground text-xl">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>
      </div>

      <SubscriptionsSection />

      {/* Feature Comparison */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-foreground md:text-4xl">Compare All Features</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            See the complete breakdown of what&apos;s included in each plan
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="p-6 text-left font-semibold text-foreground">Feature</th>
                  <th className="p-6 text-center font-semibold text-foreground">Starter</th>
                  <th className="bg-primary/10 p-6 text-center font-semibold text-foreground">Professional</th>
                  <th className="p-6 text-center font-semibold text-foreground">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(({ feature, starter, professional, enterprise }) => (
                  <tr key={feature} className="border-t border-border">
                    <td className="p-6 text-muted-foreground">{feature}</td>
                    <td className="p-6 text-center text-foreground">{starter}</td>
                    <td className="bg-primary/5 p-6 text-center text-foreground">{professional}</td>
                    <td className="p-6 text-center text-foreground">{enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-foreground md:text-4xl">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Have questions? We have answers.</p>
        </div>
        <div className="space-y-4">
          {faqs.map(({ question, answer }) => (
            <div key={question} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-2 font-semibold text-foreground text-xl">{question}</h3>
              <p className="text-muted-foreground">{answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-12 text-center md:p-16">
          <h2 className="mb-6 font-bold text-3xl text-foreground md:text-5xl">Still Have Questions?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-xl">
            Our team is here to help you find the perfect plan for your needs.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="px-8 text-lg">
              Contact Sales <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-lg">
              View Documentation
            </Button>
          </div>
        </div>
      </div>

      <ContactSection />
    </>
  );
}
