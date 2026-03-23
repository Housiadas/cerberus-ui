import { CheckCircle, Cpu, Lock, Zap } from "lucide-react";

const offerings = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Sub-50ms response times with global edge deployment and intelligent caching.",
    highlights: ["99.9% Uptime SLA", "Auto-scaling", "Zero-downtime deploys"],
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption and compliance certifications.",
    highlights: ["SOC 2 Certified", "E2E Encryption", "DDoS Protection"],
  },
  {
    icon: Cpu,
    title: "Modern Infrastructure",
    description: "Cloud-native architecture built on Kubernetes with multi-region support.",
    highlights: ["Multi-cloud", "Microservices", "Real-time analytics"],
  },
];

export function WhatWeOfferSection() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4 text-center">
        <h2 className="font-bold text-3xl text-foreground md:text-4xl">What We Offer</h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Built for modern development teams who demand speed, security, and reliability.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {offerings.map(({ icon: Icon, title, description, highlights }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-gradient-to-b from-muted/50 to-transparent p-8"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
              <Icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="mb-3 font-bold text-foreground text-xl">{title}</h3>
            <p className="mb-6 text-muted-foreground">{description}</p>
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-foreground/80 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
