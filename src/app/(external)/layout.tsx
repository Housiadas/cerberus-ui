import type { ReactNode } from "react";

import type { Metadata } from "next";

import { APP_CONFIG } from "@/config";

import { Footer, NavMain } from "./_components";

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_CONFIG.name}`,
    default: APP_CONFIG.name,
  },
  description: APP_CONFIG.meta.description,
};

export default async function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="dark min-h-screen bg-gradient-to-br from-black via-zinc-950 to-neutral-950">
      {/* Navbar */}
      <NavMain />

      {children}

      {/* Footer */}
      <Footer />
    </div>
  );
}
