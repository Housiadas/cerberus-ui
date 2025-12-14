import type { ReactNode } from "react";

import { Footer, NavMain } from "./_components";

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
