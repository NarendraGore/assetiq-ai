import {
  FileBarChart,
  FolderTree,
  LayoutDashboard,
  Package,
  Warehouse,
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
      title: "Products",
      href: "/products",
      icon: Package,
    },
    {
      title: "Inventory",
      href: "/inventory",
      icon: Warehouse,
    },
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
