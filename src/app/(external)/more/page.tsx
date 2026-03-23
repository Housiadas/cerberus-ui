import { CheckCircle } from "lucide-react";

import { Badge, ContactSection, FeaturesSection } from "../_components";

export const metadata = {
  title: "Learn More",
};

const capabilities = [
  "Enterprise-grade security",
  "Scalable infrastructure",
  "Real-time collaboration",
  "Advanced analytics",
  "API-first architecture",
];

const infraItems = [
  { title: "Cloud-Native Architecture", description: "Built for scale with Kubernetes and microservices" },
  { title: "Multi-Region Deployment", description: "Deploy across AWS, GCP, and Azure regions" },
  { title: "Auto-Scaling", description: "Automatically adjust resources based on demand" },
];

const securityItems = [
  { title: "End-to-End Encryption", description: "All data encrypted in transit and at rest" },
  { title: "SOC 2 Compliance", description: "Certified for enterprise security standards" },
  { title: "DDoS Protection", description: "Built-in protection against attacks" },
];

const testimonials = [
  {
    initials: "JD",
    name: "John Doe",
    role: "CTO, TechCorp",
    quote:
      "This platform has completely transformed how we build and deploy our applications. The speed and reliability are unmatched.",
  },
  {
    initials: "SA",
    name: "Sarah Anderson",
    role: "Lead Developer, StartupXYZ",
    quote: "The developer experience is fantastic. Everything just works, and the documentation is excellent.",
  },
  {
    initials: "MC",
    name: "Michael Chen",
    role: "Engineering Manager, Enterprise Inc",
    quote: "We've reduced our deployment time by 80% and our infrastructure costs by 40%. Highly recommend!",
  },
];

const statsData = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "10k+", label: "Active Users" },
  { value: "50ms", label: "Avg Response" },
  { value: "24/7", label: "Support" },
];

export default function LearnMore() {
  return (
    <>
      {/* Overview */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <Badge title="Learn More" />
            <h2 className="font-bold text-3xl text-foreground md:text-4xl">Built for Modern Development Teams</h2>
            <p className="text-lg text-muted-foreground">
              Our platform is designed to streamline your workflow, reduce complexity, and help you focus on what
              matters most: building great products.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {statsData.map(({ value, label }) => (
                <div key={label} className="rounded-xl border border-border bg-card p-4">
                  <div className="mb-1 font-bold text-3xl text-foreground">{value}</div>
                  <div className="text-muted-foreground text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-8">
            <div className="space-y-4">
              {capabilities.map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FeaturesSection />

      {/* Technology Stack */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-foreground md:text-4xl">Built on Modern Technology</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We use cutting-edge technologies to ensure reliability, performance, and security.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="font-bold text-2xl text-foreground">Infrastructure</h3>
              <ul className="space-y-4">
                {infraItems.map(({ title, description }) => (
                  <li key={title} className="flex items-start space-x-3">
                    <div className="mt-2 h-2 w-2 rounded-full bg-primary" />
                    <div>
                      <div className="font-semibold text-foreground">{title}</div>
                      <div className="text-muted-foreground text-sm">{description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="font-bold text-2xl text-foreground">Security</h3>
              <ul className="space-y-4">
                {securityItems.map(({ title, description }) => (
                  <li key={title} className="flex items-start space-x-3">
                    <div className="mt-2 h-2 w-2 rounded-full bg-primary" />
                    <div>
                      <div className="font-semibold text-foreground">{title}</div>
                      <div className="text-muted-foreground text-sm">{description}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-foreground md:text-4xl">Loved by Developers</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            See what teams around the world are saying about our platform.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map(({ initials, name, role, quote }) => (
            <div key={name} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={`star-${name}-${i}`} className="h-5 w-5 text-primary">
                    &#9733;
                  </div>
                ))}
              </div>
              <p className="mb-4 text-muted-foreground">&quot;{quote}&quot;</p>
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {initials}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{name}</div>
                  <div className="text-muted-foreground text-sm">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContactSection />
    </>
  );
}
