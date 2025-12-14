import { ArrowRight, Award, Globe, Heart, Lightbulb, Shield, Target, TrendingUp, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Badge } from "../_components/badge/badge";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="space-y-6 text-center">
          <Badge title="About" />
          <h1 className="font-bold text-4xl text-white leading-tight md:text-6xl">
            Building the Future of
            <br />
            <span className="text-white">Web Development</span>
          </h1>
          <p className="mx-auto max-w-3xl text-gray-400 text-xl">
            We&apos;re on a mission to empower developers and teams around the world to build better, faster, and more
            innovative digital experiences.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-bold text-3xl text-white md:text-4xl">Our Story</h2>
            <p className="text-gray-400 text-lg">
              Founded in 2020, YourBrand started with a simple idea: make web development accessible, efficient, and
              enjoyable for everyone. What began as a small team of passionate developers has grown into a global
              platform serving thousands of users.
            </p>
            <p className="text-gray-400 text-lg">
              Today, we&apos;re proud to be at the forefront of modern web development, continuously innovating and
              boundaries of what&apos;s possible.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 font-bold text-4xl text-white">2020</div>
              <div className="text-gray-400">Founded</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 font-bold text-4xl text-white">50+</div>
              <div className="text-gray-400">Team Members</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 font-bold text-4xl text-white">10k+</div>
              <div className="text-gray-400">Active Users</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 font-bold text-4xl text-white">150+</div>
              <div className="text-gray-400">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div id="mission" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-white md:text-4xl">Our Mission & Vision</h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg">Driven by purpose, guided by values</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[oklch(0.6723_0.1606_244.9955)]/20 to-transparent p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.6723_0.1606_244.9955)]">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-4 font-bold text-2xl text-white">Our Mission</h3>
            <p className="text-gray-400 text-lg">
              To democratize web development by providing powerful, intuitive tools that enable anyone to build
              exceptional digital experiences without compromise.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[oklch(0.6723_0.1606_244.9955)]/20 to-transparent p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.6723_0.1606_244.9955)]">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h3 className="mb-4 font-bold text-2xl text-white">Our Vision</h3>
            <p className="text-gray-400 text-lg">
              A world where every developer has access to enterprise-grade tools and infrastructure, enabling innovation
              and creativity at any scale.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div id="values" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-white md:text-4xl">Our Core Values</h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg">The principles that guide everything we do</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
              <Lightbulb className="h-6 w-6 text-black" />
            </div>
            <h3 className="mb-3 font-semibold text-white text-xl">Innovation</h3>
            <p className="text-gray-400">
              We constantly push boundaries and explore new possibilities to deliver cutting-edge solutions.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
              <Users className="h-6 w-6 text-black" />
            </div>
            <h3 className="mb-3 font-semibold text-white text-xl">Community</h3>
            <p className="text-gray-400">
              We believe in the power of collaboration and building together with our global community.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
              <Shield className="h-6 w-6 text-black" />
            </div>
            <h3 className="mb-3 font-semibold text-white text-xl">Trust</h3>
            <p className="text-gray-400">
              We prioritize security, transparency, and reliability in everything we build and deliver.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
              <Award className="h-6 w-6 text-black" />
            </div>
            <h3 className="mb-3 font-semibold text-white text-xl">Excellence</h3>
            <p className="text-gray-400">
              We strive for the highest quality in our products, services, and customer experiences.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
              <TrendingUp className="h-6 w-6 text-black" />
            </div>
            <h3 className="mb-3 font-semibold text-white text-xl">Growth</h3>
            <p className="text-gray-400">
              We embrace continuous learning and improvement, both individually and as a team.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white">
              <Heart className="h-6 w-6 text-black" />
            </div>
            <h3 className="mb-3 font-semibold text-white text-xl">Empathy</h3>
            <p className="text-gray-400">
              We listen, understand, and design with our users&apos; needs and perspectives at heart.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div id="team" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-white md:text-4xl">Meet Our Leadership</h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg">
            Experienced leaders passionate about technology and innovation
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.6723_0.1606_244.9955)] to-[oklch(0.6723_0.1606_244.9955)]/50 font-bold text-3xl text-white">
              JD
            </div>
            <div className="text-center">
              <h3 className="mb-1 font-semibold text-white text-xl">Jane Doe</h3>
              <p className="mb-3 text-[oklch(0.6723_0.1606_244.9955)]">CEO & Co-Founder</p>
              <p className="text-gray-400 text-sm">
                Former VP of Engineering at TechGiant. 15+ years building scalable platforms.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.6723_0.1606_244.9955)] to-[oklch(0.6723_0.1606_244.9955)]/50 font-bold text-3xl text-white">
              JS
            </div>
            <div className="text-center">
              <h3 className="mb-1 font-semibold text-white text-xl">John Smith</h3>
              <p className="mb-3 text-[oklch(0.6723_0.1606_244.9955)]">CTO & Co-Founder</p>
              <p className="text-gray-400 text-sm">
                Previously led engineering teams at major cloud providers. Expert in distributed systems.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.6723_0.1606_244.9955)] to-[oklch(0.6723_0.1606_244.9955)]/50 font-bold text-3xl text-white">
              SJ
            </div>
            <div className="text-center">
              <h3 className="mb-1 font-semibold text-white text-xl">Sarah Johnson</h3>
              <p className="mb-3 text-[oklch(0.6723_0.1606_244.9955)]">VP of Product</p>
              <p className="text-gray-400 text-sm">
                10+ years in product management. Passionate about user experience and design.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Careers Section */}
      <div id="careers" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[oklch(0.6723_0.1606_244.9955)]/20 to-transparent p-12 md:p-16">
          <div className="space-y-6 text-center">
            <h2 className="font-bold text-3xl text-white md:text-5xl">Join Our Team</h2>
            <p className="mx-auto max-w-2xl text-gray-400 text-xl">
              We&apos;re always looking for talented individuals who share our passion for innovation and excellence.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-[oklch(0.6723_0.1606_244.9955)] px-8 text-lg text-white hover:bg-[oklch(0.6723_0.1606_244.9955)]/90"
              >
                View Open Positions <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 px-8 text-lg text-white hover:bg-white/10">
                Learn About Culture
              </Button>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-2 font-bold text-3xl text-white">Remote First</div>
              <p className="text-gray-400">Work from anywhere in the world</p>
            </div>
            <div className="text-center">
              <div className="mb-2 font-bold text-3xl text-white">Competitive Pay</div>
              <p className="text-gray-400">Market-leading compensation packages</p>
            </div>
            <div className="text-center">
              <div className="mb-2 font-bold text-3xl text-white">Great Benefits</div>
              <p className="text-gray-400">Health, equity, and unlimited PTO</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
