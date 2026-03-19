"use client";

import React from "react";

import { ArrowRight, Building, Check, Star, X, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge } from "../_components";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = React.useState("monthly");

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
        { text: "Team Collaboration", included: false },
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
        { text: "SSL Certificate", included: true },
        { text: "Custom Domain", included: true },
        { text: "Advanced Analytics", included: true },
        { text: "Priority Support", included: false },
        { text: "Team Collaboration (5 users)", included: true },
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
        { text: "SSL Certificate", included: true },
        { text: "Custom Domain", included: true },
        { text: "Advanced Analytics", included: true },
        { text: "Priority Support", included: true },
        { text: "Unlimited Team Members", included: true },
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="space-y-6 text-center">
          <Badge title="Simple, Transparent Pricing" />
          <h1 className="font-bold text-4xl text-white leading-tight md:text-6xl">
            Choose the Perfect Plan
            <br />
            <span className="text-white">for Your Needs</span>
          </h1>
          <p className="mx-auto max-w-3xl text-gray-400 text-xl">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <span className={`text-lg ${billingCycle === "monthly" ? "font-semibold text-white" : "text-gray-400"}`}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative h-7 w-14 rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <div
                className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-[oklch(0.6723_0.1606_244.9955)] transition-transform ${
                  billingCycle === "yearly" ? "translate-x-7" : ""
                }`}
              />
            </button>
            <span className={`text-lg ${billingCycle === "yearly" ? "font-semibold text-white" : "text-gray-400"}`}>
              Yearly
            </span>
            <span className="rounded-full bg-[oklch(0.6723_0.1606_244.9955)]/10 px-3 py-1 text-[oklch(0.6723_0.1606_244.9955)] text-sm">
              Save 17%
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div id="plans" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

            return (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? "scale-105 border-2 border-[oklch(0.6723_0.1606_244.9955)] bg-gradient-to-br from-[oklch(0.6723_0.1606_244.9955)]/20 to-transparent md:scale-110"
                    : "border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10"
                }`}
              >
                {plan.highlighted && (
                  <div className="mb-4 text-center">
                    <span className="inline-block rounded-full bg-[oklch(0.6723_0.1606_244.9955)] px-4 py-1 font-semibold text-sm text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6 text-center">
                  <div
                    className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                      plan.highlighted ? "bg-[oklch(0.6723_0.1606_244.9955)]" : "bg-white"
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${plan.highlighted ? "text-white" : "text-black"}`} />
                  </div>
                  <h3 className="mb-2 font-bold text-2xl text-white">{plan.name}</h3>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                <div className="mb-6 text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="font-bold text-5xl text-white">${price}</span>
                    <span className="ml-2 text-gray-400">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                  </div>
                  {billingCycle === "yearly" && price > 0 && (
                    <p className="mt-2 text-gray-400 text-sm">${(price / 12).toFixed(2)} per month, billed annually</p>
                  )}
                </div>

                <Button
                  className={`mb-6 w-full ${
                    plan.highlighted
                      ? "bg-[oklch(0.6723_0.1606_244.9955)] text-white hover:bg-[oklch(0.6723_0.1606_244.9955)]/90"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature.text} className="flex items-start space-x-3">
                      {feature.included ? (
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-[oklch(0.6723_0.1606_244.9955)]" />
                      ) : (
                        <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600" />
                      )}
                      <span className={`text-sm ${feature.included ? "text-white" : "text-gray-600"}`}>
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

      {/* Feature Comparison */}
      <div id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-white md:text-4xl">Compare All Features</h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg">
            See the complete breakdown of what&apos;s included in each plan
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="p-6 text-left font-semibold text-white">Feature</th>
                  <th className="p-6 text-center font-semibold text-white">Starter</th>
                  <th className="bg-[oklch(0.6723_0.1606_244.9955)]/10 p-6 text-center font-semibold text-white">
                    Professional
                  </th>
                  <th className="p-6 text-center font-semibold text-white">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-white/10 border-t">
                  <td className="p-6 text-gray-400">Projects</td>
                  <td className="p-6 text-center text-white">1</td>
                  <td className="bg-[oklch(0.6723_0.1606_244.9955)]/5 p-6 text-center text-white">Unlimited</td>
                  <td className="p-6 text-center text-white">Unlimited</td>
                </tr>
                <tr className="border-white/10 border-t">
                  <td className="p-6 text-gray-400">Storage</td>
                  <td className="p-6 text-center text-white">5GB</td>
                  <td className="bg-[oklch(0.6723_0.1606_244.9955)]/5 p-6 text-center text-white">50GB</td>
                  <td className="p-6 text-center text-white">Unlimited</td>
                </tr>
                <tr className="border-white/10 border-t">
                  <td className="p-6 text-gray-400">API Calls</td>
                  <td className="p-6 text-center text-white">10K/mo</td>
                  <td className="bg-[oklch(0.6723_0.1606_244.9955)]/5 p-6 text-center text-white">100K/mo</td>
                  <td className="p-6 text-center text-white">Unlimited</td>
                </tr>
                <tr className="border-white/10 border-t">
                  <td className="p-6 text-gray-400">Team Members</td>
                  <td className="p-6 text-center text-white">1</td>
                  <td className="bg-[oklch(0.6723_0.1606_244.9955)]/5 p-6 text-center text-white">5</td>
                  <td className="p-6 text-center text-white">Unlimited</td>
                </tr>
                <tr className="border-white/10 border-t">
                  <td className="p-6 text-gray-400">Support</td>
                  <td className="p-6 text-center text-white">Community</td>
                  <td className="bg-[oklch(0.6723_0.1606_244.9955)]/5 p-6 text-center text-white">Email</td>
                  <td className="p-6 text-center text-white">24/7 Priority</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-white md:text-4xl">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg">Have questions? We have answers.</p>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 font-semibold text-white text-xl">Can I change plans later?</h3>
            <p className="text-gray-400">
              Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
              cycle.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 font-semibold text-white text-xl">Is there a free trial?</h3>
            <p className="text-gray-400">
              Yes, all paid plans come with a 14-day free trial. No credit card required to start.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 font-semibold text-white text-xl">What payment methods do you accept?</h3>
            <p className="text-gray-400">
              We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. Enterprise customers can
              also pay via invoice.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-2 font-semibold text-white text-xl">Can I cancel anytime?</h3>
            <p className="text-gray-400">
              Absolutely. There are no long-term contracts. You can cancel your subscription at any time from your
              account settings.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[oklch(0.6723_0.1606_244.9955)]/20 to-transparent p-12 text-center md:p-16">
          <h2 className="mb-6 font-bold text-3xl text-white md:text-5xl">Still Have Questions?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-400 text-xl">
            Our team is here to help you find the perfect plan for your needs.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-[oklch(0.6723_0.1606_244.9955)] px-8 text-lg text-white hover:bg-[oklch(0.6723_0.1606_244.9955)]/90"
            >
              Contact Sales <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 px-8 text-lg text-white hover:bg-white/10">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
