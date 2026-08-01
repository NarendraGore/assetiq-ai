import {
  FileBarChart,
  LayoutDashboard,
  Package,
  ShoppingCart,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { UserRole } from "@/features/auth/types/auth.types";

export interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const sidebarItems: Record<UserRole, SidebarItem[]> = {
  Admin: [
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

  Manager: [
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

  Employee: [
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
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
  ],
};