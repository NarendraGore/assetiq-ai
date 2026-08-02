import {
  FileBarChart,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
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

export const sidebarItems: Record<UserRole, SidebarGroup[]> = {
  Admin: [
    {
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
    },
    {
      label: "Management",
      items: [
        {
          title: "Products",
          href: "/products",
          icon: Package,
        },
        {
          title: "Users",
          href: "/users",
          icon: Users,
        },
      ],
    },
  ],

  Manager: [
    {
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
    },
    {
      label: "Management",
      items: [
        {
          title: "Products",
          href: "/products",
          icon: Package,
        },
        {
          title: "Orders",
          href: "/orders",
          icon: ShoppingCart,
        },
      ],
    },
  ],

  Employee: [
    {
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
    },
  ],
};