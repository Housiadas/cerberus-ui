import { ReactNode } from "react";

import { Footer, NavMain } from "./_components";
import { ContactSection } from "./_components/section/contact-us";

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="dark min-h-screen bg-gradient-to-br from-black via-zinc-900 to-neutral-950">
      {/* Navbar */}
      <NavMain />

      {children}

      {/* Contact us CTA */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
