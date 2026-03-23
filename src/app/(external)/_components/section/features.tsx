import { Code, Database, Globe, Rocket, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work seamlessly with your team using real-time collaboration tools and shared workspaces.",
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Store, query, and manage your data with our high-performance database solutions.",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Deliver content faster with our worldwide network of edge servers and caching.",
  },
  {
    icon: Rocket,
    title: "Instant Deployment",
    description: "Deploy your applications in seconds with automatic scaling and zero downtime.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "End-to-end encryption, SOC 2 compliance, and built-in DDoS protection.",
  },
  {
    icon: Code,
    title: "Developer Tools",
    description: "Build with confidence using our comprehensive CLI, SDKs, and documentation.",
  },
];

export function FeaturesSection() {
  return (
    <div id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4 text-center">
        <h2 className="font-bold text-3xl text-foreground md:text-4xl">Powerful Features</h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Everything you need to build, deploy, and scale your applications with confidence.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
              <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
            </div>
            <h3 className="mb-3 font-semibold text-foreground text-xl">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
