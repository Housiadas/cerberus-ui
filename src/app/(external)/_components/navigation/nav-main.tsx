"use client";

import React from "react";

import { Menu } from "lucide-react";

import { AuthButtons } from "../button/auth-buttons";
import { Logo } from "../logo";
import { NavDesktop } from "./nav-desktop";
import { NavMobile } from "./nav-mobile";

export function NavMain() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <NavDesktop />
          <AuthButtons />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {mobileMenuOpen && <NavMobile />}
      </div>
    </nav>
  );
}
