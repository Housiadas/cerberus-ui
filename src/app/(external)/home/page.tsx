import { FeaturesSection, Badge, CTAButtons } from "../_components";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-32 lg:px-8">
        <div className="space-y-8 text-center">
          {/* Main Heading */}
          <Badge title="Home" />
          <h1 className="text-5xl leading-tight font-bold md:text-7xl">
            <span className="text-white">Build Something</span>
            <br />
            <span className="text-white">Extraordinary</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto max-w-2xl text-xl text-gray-400">
            Transform your ideas into reality with our powerful platform. Fast, secure, and designed for the modern web.
          </p>

          {/* CTA Buttons */}
          <CTAButtons />
        </div>
      </div>

      {/* Features Section */}
      <FeaturesSection />
    </>
  );
}
