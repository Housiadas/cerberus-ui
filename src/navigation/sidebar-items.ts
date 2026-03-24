import { Banknote, ChartBar, LayoutDashboard, Lock, type LucideIcon, Mail, ReceiptText, Users } from "lucide-react";

import { DashboardRoutes } from "@/lib/constants";

export interface NavSubItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  subItems?: NavSubItem[];
  comingSoon?: boolean;
  newTab?: boolean;
  isNew?: boolean;
}

export interface NavGroup {
  id: number;
  label?: string;
  items: NavMainItem[];
}

export const sidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Pages",
    items: [
      {
        title: "Dashboard",
        url: DashboardRoutes.DASHBOARD,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    id: 2,
    label: "Admin",
    items: [
      {
        title: "Users",
        url: DashboardRoutes.ADMIN_USERS,
        icon: Users,
      },
      {
        title: "Permissions",
        url: DashboardRoutes.ADMIN_PERMISSIONS,
        icon: Lock,
      },
      // {
      //   title: "Authentication",
      //   url: "/auth",
      //   icon: Fingerprint,
      //   subItems: [
      //     { title: "Login v1", url: "/auth/v1/login", newTab: true },
      //     { title: "Login v2", url: "/auth/v2/login", newTab: true },
      //     { title: "Register v1", url: "/auth/v1/register", newTab: true },
      //     { title: "Register v2", url: "/auth/v2/register", newTab: true },
      //   ],
      // },
    ],
  },
];
