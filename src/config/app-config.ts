import type { ContentLayout, NavbarStyle, SidebarCollapsible, SidebarVariant } from "@/lib/preferences/layout";
import type { ThemePreset } from "@/lib/preferences/theme";

import packageJson from "../../package.json";

export interface Config {
  name: string;
  version: string;
  copyright: string;
  themePreset: ThemePreset;
  contentLayout: ContentLayout;
  sidebarVariant: SidebarVariant;
  sidebarCollapsible: SidebarCollapsible;
  navbarStyle: NavbarStyle;
  meta: Meta;
}

export interface Meta {
  title: string;
  description: string;
}

const currentYear = new Date().getFullYear();

export const APP_CONFIG: Config = {
  name: "Cerberus",
  version: packageJson.version,
  copyright: `© ${currentYear}, Cerberus.`,
  themePreset: "vercel",
  contentLayout: "centered",
  sidebarVariant: "inset",
  sidebarCollapsible: "icon",
  navbarStyle: "scroll",
  meta: {
    title: "Cerberus",
    description: "",
  },
};
