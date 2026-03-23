import packageJson from "../../package.json";
import type { Layout } from "./layout";
import type { Meta } from "./meta";
import type { Server } from "./server";

export interface Config {
  name: string;
  version: string;
  copyright: string;
  server: Server;
  layout: Layout;
  meta: Meta;
}

const appName = process.env.NEXT_PUBLIC_APP_NAME || "Cerberus";
const currentYear = new Date().getFullYear();

export const APP_CONFIG: Config = {
  name: appName,
  version: packageJson.version,
  server: {
    url: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4000",
  },
  layout: {
    themePreset: "claude",
    contentLayout: "centered",
    sidebarVariant: "inset",
    sidebarCollapsible: "icon",
    navbarStyle: "scroll",
  },
  meta: {
    title: appName,
    description: "",
  },
  copyright: `© ${currentYear}, ${appName}.`,
};
