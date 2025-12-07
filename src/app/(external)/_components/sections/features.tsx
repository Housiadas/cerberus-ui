import { Zap, Shield, Sparkles } from "lucide-react";

export function Features() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Feature 1 */}
        <div className="bg-card border-border hover:bg-accent/50 group rounded-2xl border p-8 shadow-sm transition-all duration-300">
          <div className="bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
            <Zap className="text-primary-foreground h-6 w-6" />
          </div>
          <h3 className="text-foreground mb-3 text-xl font-semibold">Lightning Fast</h3>
          <p className="text-muted-foreground">
            Experience blazing fast performance with our optimized infrastructure and cutting-edge technology.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-card border-border hover:bg-accent/50 group rounded-2xl border p-8 shadow-sm transition-all duration-300">
          <div className="bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
            <Shield className="text-primary-foreground h-6 w-6" />
          </div>
          <h3 className="text-foreground mb-3 text-xl font-semibold">Secure by Default</h3>
          <p className="text-muted-foreground">
            Your data is protected with enterprise-grade security and encryption at every level.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-card border-border hover:bg-accent/70 group rounded-2xl border p-8 shadow-sm transition-all duration-300">
          <div className="bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
            <Sparkles className="text-primary-foreground h-6 w-6" />
          </div>
          <h3 className="text-foreground mb-3 text-xl font-semibold">Beautiful Design</h3>
          <p className="text-muted-foreground">
            Crafted with attention to detail, delivering an exceptional user experience every time.
          </p>
        </div>
      </div>
    </div>
  );
}
