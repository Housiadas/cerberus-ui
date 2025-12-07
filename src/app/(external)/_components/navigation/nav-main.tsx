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
    <nav className="border-border bg-primary sticky top-0 z-50 border-b border-zinc-800 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <NavDesktop />

          {/* Auth Buttons */}
          <AuthButtons />

          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-white md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && <NavMobile />}
      </div>
    </nav>
  );
}
