import {
  Badge,
  ContactSection,
  CTAButtons,
  FeaturesSection,
  SubscriptionsSection,
  WhatWeOfferSection,
} from "../_components";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-32 lg:px-8">
        <div className="space-y-8 text-center">
          <Badge title="Welcome to Cerberus" />
          <h1 className="font-bold text-5xl leading-tight md:text-7xl">
            <span className="text-foreground">Build Something</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
            Transform your ideas into reality with our powerful platform. Fast, secure, and designed for the modern web.
          </p>
          <CTAButtons />
        </div>
      </div>

      <FeaturesSection />
      <WhatWeOfferSection />
      <SubscriptionsSection />
      <ContactSection />
    </>
  );
}
