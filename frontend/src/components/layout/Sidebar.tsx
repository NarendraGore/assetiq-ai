"use client";

import Link from "next/link";
import {
  Home,
  Boxes,
  Package,
  Building2,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: Boxes,
  },
  {
    title: "Suppliers",
    href: "/suppliers",
    icon: Building2,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">
        AssetIQAI
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-muted transition-colors"
            >
              <Icon className="h-5 w-5" />

              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}