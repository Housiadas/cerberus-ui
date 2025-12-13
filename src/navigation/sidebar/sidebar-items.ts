import {
  Mail,
  ReceiptText,
  Users,
  Lock,
  LayoutDashboard,
  ChartBar,
  Banknote,
  Gauge,
  type LucideIcon,
} from "lucide-react";

import { DashboardRoutes } from "../routes";

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
      {
        title: "CRM",
        url: DashboardRoutes.CRM,
        icon: ChartBar,
      },
      {
        title: "Finance",
        url: DashboardRoutes.FINANCE,
        icon: Banknote,
      },
      // {
      //   title: "Analytics",
      //   url: DashboardRoutes.ANALYTICS,
      //   icon: Gauge,
      //   comingSoon: true,
      // },
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
        title: "Roles",
        url: DashboardRoutes.ADMIN_ROLES,
        icon: Lock,
      },
      {
        title: "Invoice",
        url: DashboardRoutes.COMMING_SOON,
        icon: ReceiptText,
      },
      {
        title: "Email",
        url: DashboardRoutes.COMMING_SOON,
        icon: Mail,
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
