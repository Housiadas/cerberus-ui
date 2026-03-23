"use client";

import { useState } from "react";

import { Building, Check, Star, X, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    icon: Zap,
    description: "Perfect for individuals and small projects",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { text: "1 Project", included: true },
      { text: "5GB Storage", included: true },
      { text: "10,000 API Calls/month", included: true },
      { text: "Community Support", included: true },
      { text: "SSL Certificate", included: true },
      { text: "Custom Domain", included: false },
      { text: "Advanced Analytics", included: false },
      { text: "Priority Support", included: false },
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    icon: Star,
    description: "For growing teams and businesses",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      { text: "Unlimited Projects", included: true },
      { text: "50GB Storage", included: true },
      { text: "100,000 API Calls/month", included: true },
      { text: "Email Support", included: true },
      { text: "Custom Domain", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "Team Collaboration (5 users)", included: true },
      { text: "Priority Support", included: false },
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    icon: Building,
    description: "For large organizations with custom needs",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      { text: "Unlimited Projects", included: true },
      { text: "Unlimited Storage", included: true },
      { text: "Unlimited API Calls", included: true },
      { text: "24/7 Phone & Email Support", included: true },
      { text: "Custom Domain", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "Unlimited Team Members", included: true },
      { text: "Priority Support", included: true },
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function SubscriptionsSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Billing Toggle */}
      <div className="mb-12 flex items-center justify-center gap-4">
        <span
          className={`text-lg ${billingCycle === "monthly" ? "font-semibold text-foreground" : "text-muted-foreground"}`}
        >
          Monthly
        </span>
        <button
          type="button"
          onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
          className="relative h-7 w-14 rounded-full bg-muted transition-colors hover:bg-muted/80"
        >
          <div
            className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-primary transition-transform ${
              billingCycle === "yearly" ? "translate-x-7" : ""
            }`}
          />
        </button>
        <span
          className={`text-lg ${billingCycle === "yearly" ? "font-semibold text-foreground" : "text-muted-foreground"}`}
        >
          Yearly
        </span>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-primary text-sm">Save 17%</span>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

          return (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? "scale-105 border-2 border-primary bg-gradient-to-br from-primary/10 to-transparent shadow-lg md:scale-110"
                  : "border border-border bg-card hover:shadow-md"
              }`}
            >
              {plan.highlighted && (
                <div className="mb-4 text-center">
                  <span className="inline-block rounded-full bg-primary px-4 py-1 font-semibold text-primary-foreground text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6 text-center">
                <div
                  className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                    plan.highlighted ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`} />
                </div>
                <h3 className="mb-2 font-bold text-2xl text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-6 text-center">
                <div className="flex items-baseline justify-center">
                  <span className="font-bold text-5xl text-foreground">${price}</span>
                  <span className="ml-2 text-muted-foreground">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                </div>
                {billingCycle === "yearly" && price > 0 && (
                  <p className="mt-2 text-muted-foreground text-sm">
                    ${(price / 12).toFixed(2)} per month, billed annually
                  </p>
                )}
              </div>

              <Button className="mb-6 w-full" variant={plan.highlighted ? "default" : "outline"}>
                {plan.cta}
              </Button>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature.text} className="flex items-start space-x-3">
                    {feature.included ? (
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                    ) : (
                      <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground/50" />
                    )}
                    <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground/50"}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
