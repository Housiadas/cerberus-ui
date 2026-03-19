import { CheckCircle } from "lucide-react";

import { FeaturesSection } from "../_components";
import { Badge } from "../_components/badge/badge";

export default function LearMore() {
  return (
    <>
      {/* Overview Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <Badge title="Lean More" />
            <h2 className="font-bold text-3xl text-white md:text-4xl">Built for Modern Development Teams</h2>
            <p className="text-gray-400 text-lg">
              Our platform is designed to streamline your workflow, reduce complexity, and help you focus on what
              matters most: building great products.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-1 font-bold text-3xl text-white">99.9%</div>
                <div className="text-gray-400 text-sm">Uptime SLA</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-1 font-bold text-3xl text-white">10k+</div>
                <div className="text-gray-400 text-sm">Active Users</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-1 font-bold text-3xl text-white">50ms</div>
                <div className="text-gray-400 text-sm">Avg Response</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="mb-1 font-bold text-3xl text-white">24/7</div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[oklch(0.6723_0.1606_244.9955)]/20 to-transparent p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-[oklch(0.6723_0.1606_244.9955)]" />
                  <span className="text-white">Enterprise-grade security</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-[oklch(0.6723_0.1606_244.9955)]" />
                  <span className="text-white">Scalable infrastructure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-[oklch(0.6723_0.1606_244.9955)]" />
                  <span className="text-white">Real-time collaboration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-[oklch(0.6723_0.1606_244.9955)]" />
                  <span className="text-white">Advanced analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-[oklch(0.6723_0.1606_244.9955)]" />
                  <span className="text-white">API-first architecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <FeaturesSection />

      {/* Technology Stack */}
      <div id="technology" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-white md:text-4xl">Built on Modern Technology</h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg">
            We use cutting-edge technologies to ensure reliability, performance, and security.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="font-bold text-2xl text-white">Infrastructure</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-[oklch(0.6723_0.1606_244.9955)]" />
                  <div>
                    <div className="font-semibold text-white">Cloud-Native Architecture</div>
                    <div className="text-gray-400 text-sm">Built for scale with Kubernetes and microservices</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-[oklch(0.6723_0.1606_244.9955)]" />
                  <div>
                    <div className="font-semibold text-white">Multi-Region Deployment</div>
                    <div className="text-gray-400 text-sm">Deploy across AWS, GCP, and Azure regions</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-[oklch(0.6723_0.1606_244.9955)]" />
                  <div>
                    <div className="font-semibold text-white">Auto-Scaling</div>
                    <div className="text-gray-400 text-sm">Automatically adjust resources based on demand</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="font-bold text-2xl text-white">Security</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-[oklch(0.6723_0.1606_244.9955)]" />
                  <div>
                    <div className="font-semibold text-white">End-to-End Encryption</div>
                    <div className="text-gray-400 text-sm">All data encrypted in transit and at rest</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-[oklch(0.6723_0.1606_244.9955)]" />
                  <div>
                    <div className="font-semibold text-white">SOC 2 Compliance</div>
                    <div className="text-gray-400 text-sm">Certified for enterprise security standards</div>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-2 h-2 w-2 rounded-full bg-[oklch(0.6723_0.1606_244.9955)]" />
                  <div>
                    <div className="font-semibold text-white">DDoS Protection</div>
                    <div className="text-gray-400 text-sm">Built-in protection against attacks</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4 text-center">
          <h2 className="font-bold text-3xl text-white md:text-4xl">Loved by Developers</h2>
          <p className="mx-auto max-w-2xl text-gray-400 text-lg">
            See what teams around the world are saying about our platform.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center space-x-1">
              {Array.from({ length: 5 }, (_, i) => `star-${i}`).map((id) => (
                <div key={id} className="h-5 w-5 text-[oklch(0.6723_0.1606_244.9955)]">
                  ★
                </div>
              ))}
            </div>
            <p className="mb-4 text-gray-400">
              &quot;This platform has completely transformed how we build and deploy our applications. The speed and
              reliability are unmatched.&quot;
            </p>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.6723_0.1606_244.9955)]/20 font-semibold text-white">
                JD
              </div>
              <div>
                <div className="font-semibold text-white">John Doe</div>
                <div className="text-gray-400 text-sm">CTO, TechCorp</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center space-x-1">
              {Array.from({ length: 5 }, (_, i) => `star-${i}`).map((id) => (
                <div key={id} className="h-5 w-5 text-[oklch(0.6723_0.1606_244.9955)]">
                  ★
                </div>
              ))}
            </div>
            <p className="mb-4 text-gray-400">
              &quot;The developer experience is fantastic. Everything just works, and the documentation is
              excellent.&quot;
            </p>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.6723_0.1606_244.9955)]/20 font-semibold text-white">
                SA
              </div>
              <div>
                <div className="font-semibold text-white">Sarah Anderson</div>
                <div className="text-gray-400 text-sm">Lead Developer, StartupXYZ</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center space-x-1">
              {Array.from({ length: 5 }, (_, i) => `star-${i}`).map((id) => (
                <div key={id} className="h-5 w-5 text-[oklch(0.6723_0.1606_244.9955)]">
                  ★
                </div>
              ))}
            </div>
            <p className="mb-4 text-gray-400">
              &quot;We&apos;ve reduced our deployment time by 80% and our infrastructure costs by 40%. Highly
              recommend!&quot;
            </p>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[oklch(0.6723_0.1606_244.9955)]/20 font-semibold text-white">
                MC
              </div>
              <div>
                <div className="font-semibold text-white">Michael Chen</div>
                <div className="text-gray-400 text-sm">Engineering Manager, Enterprise Inc</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
