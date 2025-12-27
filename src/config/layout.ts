import type { ContentLayout, NavbarStyle, SidebarCollapsible, SidebarVariant } from "@/lib/preferences/layout";
import type { ThemePreset } from "@/lib/preferences/theme";

export interface Layout {
  themePreset: ThemePreset;
  contentLayout: ContentLayout;
  sidebarVariant: SidebarVariant;
  sidebarCollapsible: SidebarCollapsible;
  navbarStyle: NavbarStyle;
}
