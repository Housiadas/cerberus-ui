import { Users, Database, Globe, Rocket, Target, Code } from "lucide-react";

export function FeaturesSection() {
  return (
    <div id="features" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 space-y-4 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">Powerful Features</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-400">
          Everything you need to build, deploy, and scale your applications with confidence.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.6723_0.1606_244.9955)]">
            <Users className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-white">Team Collaboration</h3>
          <p className="text-gray-400">
            Work seamlessly with your team using real-time collaboration tools and shared workspaces.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.6723_0.1606_244.9955)]">
            <Database className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-white">Data Management</h3>
          <p className="text-gray-400">
            Store, query, and manage your data with our high-performance database solutions.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.6723_0.1606_244.9955)]">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-white">Global CDN</h3>
          <p className="text-gray-400">
            Deliver content faster with our worldwide network of edge servers and caching.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.6723_0.1606_244.9955)]">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-white">Instant Deployment</h3>
          <p className="text-gray-400">Deploy your applications in seconds with automatic scaling and zero downtime.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.6723_0.1606_244.9955)]">
            <Target className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-white">Performance Monitoring</h3>
          <p className="text-gray-400">
            Track metrics, identify bottlenecks, and optimize performance with detailed insights.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.6723_0.1606_244.9955)]">
            <Code className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-3 text-xl font-semibold text-white">Developer Tools</h3>
          <p className="text-gray-400">Build with confidence using our comprehensive CLI, SDKs, and documentation.</p>
        </div>
      </div>
    </div>
  );
}
