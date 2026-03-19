import type { ReactNode } from "react";

import { Inter } from "next/font/google";

import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { APP_CONFIG } from "@/config";
import type { ThemeMode, ThemePreset } from "@/lib/preferences/theme";
import { AuthStoreProvider } from "@/stores/auth/auth-provider";
import { PreferencesStoreProvider } from "@/stores/preferences/preferences-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_CONFIG.name}`,
    default: APP_CONFIG.name,
  },
  description: APP_CONFIG.meta.description,
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const themeMode: ThemeMode = "light";
  const themePreset: ThemePreset = APP_CONFIG.layout.themePreset;

  return (
    <html lang="en" className={themeMode} data-theme-preset={themePreset} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <AuthStoreProvider>
          <PreferencesStoreProvider themeMode={themeMode} themePreset={themePreset}>
            {children}
            <Toaster />
          </PreferencesStoreProvider>
        </AuthStoreProvider>
      </body>
    </html>
  );
}
