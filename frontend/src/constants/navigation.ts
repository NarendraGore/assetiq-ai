import {
  Home,
  Boxes,
  Building2,
  Package,
  BarChart3,
  Settings,
} from "lucide-react";

import { ROLES } from "./roles";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    roles: [
      ROLES.ADMIN,
      ROLES.MANAGER,
      ROLES.EMPLOYEE,
    ],
  },

  {
    title: "Categories",
    href: "/categories",
    icon: Boxes,
    roles: [
      ROLES.ADMIN,
      ROLES.EMPLOYEE,
    ],
  },

  {
    title: "Suppliers",
    href: "/suppliers",
    icon: Building2,
    roles: [
      ROLES.ADMIN,
      ROLES.EMPLOYEE,
    ],
  },

  {
    title: "Products",
    href: "/products",
    icon: Package,
    roles: [
      ROLES.ADMIN,
      ROLES.MANAGER,
      ROLES.EMPLOYEE,
    ],
  },

  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
    roles: [
      ROLES.ADMIN,
      ROLES.MANAGER,
      ROLES.EMPLOYEE,
    ],
  },

  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
    roles: [
      ROLES.ADMIN,
      ROLES.MANAGER,
      ROLES.EMPLOYEE,
    ],
  },

  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    roles: [
      ROLES.ADMIN,
      ROLES.EMPLOYEE,
    ],
  },
];