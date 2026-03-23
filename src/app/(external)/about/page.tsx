import { ArrowRight, Award, Globe, Heart, Lightbulb, Shield, Target, TrendingUp, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge, ContactSection } from "../_components";

export const metadata = {
  title: "About",
};

const values = [
  { icon: Lightbulb, title: "Innovation", description: "We constantly push boundaries and explore new possibilities." },
  { icon: Users, title: "Community", description: "We believe in collaboration and building together globally." },
  { icon: Shield, title: "Trust", description: "We prioritize security, transparency, and reliability." },
  { icon: Award, title: "Excellence", description: "We strive for the highest quality in everything we do." },
  { icon: TrendingUp, title: "Growth", description: "We embrace continuous learning and improvement." },
  { icon: Heart, title: "Empathy", description: "We design with our users' needs and perspectives at heart." },
];

const stats = [
  { value: "2020", label: "Founded" },
  { value: "50+", label: "Team Members" },
  { value: "10k+", label: "Active Users" },
  { value: "150+", label: "Countries" },
];

const team = [
  {
    initials: "JD",
    name: "Jane Doe",
    role: "CEO & Co-Founder",
    bio: "Former VP of Engineering at TechGiant. 15+ years building scalable platforms.",
  },
  {
    initials: "JS",
    name: "John Smith",
    role: "CTO & Co-Founder",
    bio: "Previously led engineering teams at major cloud providers. Expert in distributed systems.",
  },
  {
    initials: "SJ",
    name: "Sarah Johnson",
    role: "VP of Product",
    bio: "10+ years in product management. Passionate about user experience and design.",
  },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="space-y-6 text-center">
          <Badge title="About" />
          <h1 className="font-bold text-4xl text-foreground leading-tight md:text-6xl">
            Building the Future of
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Web Development
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-muted-foreground text-xl">
            We&apos;re on a mission to empower developers and teams around the world to build better, faster, and more
            innovative digital experiences.
          </p>
        </div>
      </div>

      {/* Story + Stats */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-bold text-3xl text-foreground md:text-4xl">Our Story</h2>
            <p className="text-lg text-muted-foreground">
              Founded in 2020, Cerberus started with a simple idea: make web development accessible, efficient, and
              enjoyable for everyone. What began as a small team of passionate developers has grown into a global
              platform serving thousands of users.
            </p>
            <p className="text-lg text-muted-foreground">
              Today, we&apos;re proud to be at the forefront of modern web development, continuously innovating and
              pushing the boundaries of what&apos;s possible.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="rounded-2xl border border-border bg-card p-6">
                <div className="mb-2 font-bold text-4xl text-foreground">{value}</div>
                <div className="text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-foreground md:text-4xl">Our Mission &amp; Vision</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">Driven by purpose, guided by values</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Target className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mb-4 font-bold text-2xl text-foreground">Our Mission</h3>
            <p className="text-lg text-muted-foreground">
              To democratize web development by providing powerful, intuitive tools that enable anyone to build
              exceptional digital experiences without compromise.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mb-4 font-bold text-2xl text-foreground">Our Vision</h3>
            <p className="text-lg text-muted-foreground">
              A world where every developer has access to enterprise-grade tools and infrastructure, enabling innovation
              and creativity at any scale.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-foreground md:text-4xl">Our Core Values</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">The principles that guide everything we do</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {values.map(({ icon: Icon, title, description }) => (
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

      {/* Team */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-foreground md:text-4xl">Meet Our Leadership</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Experienced leaders passionate about technology and innovation
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {team.map(({ initials, name, role, bio }) => (
            <div
              key={name}
              className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/50 font-bold text-3xl text-primary-foreground">
                {initials}
              </div>
              <div className="text-center">
                <h3 className="mb-1 font-semibold text-foreground text-xl">{name}</h3>
                <p className="mb-3 text-primary">{role}</p>
                <p className="text-muted-foreground text-sm">{bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Careers CTA */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 to-transparent p-12 md:p-16">
          <div className="space-y-6 text-center">
            <h2 className="font-bold text-3xl text-foreground md:text-5xl">Join Our Team</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
              We&apos;re always looking for talented individuals who share our passion for innovation and excellence.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button size="lg" className="px-8 text-lg">
                View Open Positions <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-lg">
                Learn About Culture
              </Button>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 font-bold text-3xl text-foreground">Remote First</div>
              <p className="text-muted-foreground">Work from anywhere in the world</p>
            </div>
            <div className="text-center">
              <div className="mb-2 font-bold text-3xl text-foreground">Competitive Pay</div>
              <p className="text-muted-foreground">Market-leading compensation packages</p>
            </div>
            <div className="text-center">
              <div className="mb-2 font-bold text-3xl text-foreground">Great Benefits</div>
              <p className="text-muted-foreground">Health, equity, and unlimited PTO</p>
            </div>
          </div>
        </div>
      </div>

      <ContactSection />
    </>
  );
}
