import type { ReactNode } from "react";

import { Inter } from "next/font/google";

import type { Metadata } from "next";

import { Toaster } from "@/components/ui/sonner";
import { APP_CONFIG } from "@/config";
import { THEME_MODE_VALUES, THEME_PRESET_VALUES, type ThemeMode, type ThemePreset } from "@/lib/preferences/theme";
import { MSWProvider } from "@/providers/msw-provider";
import { QueryProvider } from "@/providers/query-provider";
import { getPreference } from "@/server/server-actions";
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

const DevMSWProvider =
  process.env.NODE_ENV === "development" ? MSWProvider : ({ children }: { children: ReactNode }) => children;

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const themeMode = await getPreference<ThemeMode>("theme_mode", THEME_MODE_VALUES, "light");
  const themePreset = await getPreference<ThemePreset>(
    "theme_preset",
    THEME_PRESET_VALUES,
    APP_CONFIG.layout.themePreset,
  );

  return (
    <html lang="en" className={themeMode} data-theme-preset={themePreset} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <DevMSWProvider>
          <AuthStoreProvider>
            <QueryProvider>
              <PreferencesStoreProvider themeMode={themeMode} themePreset={themePreset}>
                {children}
                <Toaster />
              </PreferencesStoreProvider>
            </QueryProvider>
          </AuthStoreProvider>
        </DevMSWProvider>
      </body>
    </html>
  );
}
