import {
  FileBarChart,
  FolderTree,
  LayoutDashboard,
  Truck,
  type LucideIcon,
} from "lucide-react";

import type { UserRole } from "@/features/auth/types/auth.types";

export interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

/**
 * Every `href` below must resolve to a page under `app/(app)`.
 *
 * The previous config linked Admin to `/users`, Manager to `/orders` and both
 * to `/products` — none of which exist, so those entries rendered a live link
 * straight to a 404. They were also the only entries in the "Management"
 * group, and Categories/Suppliers were listed for Employee only, meaning an
 * Admin had no way to reach two of the app's five screens.
 *
 * Role-based menus are kept, but until the missing pages ship every role sees
 * the same real routes. Re-introduce the differences alongside the routes.
 */
const generalGroup: SidebarGroup = {
  label: "General",
  items: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Reports",
      href: "/reports",
      icon: FileBarChart,
    },
  ],
};

const managementGroup: SidebarGroup = {
  label: "Management",
  items: [
    {
      title: "Categories",
      href: "/categories",
      icon: FolderTree,
    },
    {
      title: "Suppliers",
      href: "/suppliers",
      icon: Truck,
    },
  ],
};

export const sidebarItems: Record<UserRole, SidebarGroup[]> = {
  Admin: [generalGroup, managementGroup],
  Manager: [generalGroup, managementGroup],
  Employee: [generalGroup, managementGroup],
};
