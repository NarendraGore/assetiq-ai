"use client";
import Link from "next/link";
import { Home, Package, Users, BarChart, Menu } from "lucide-react";
import { useState } from "react";

const navConfig = {
  admin: [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/suppliers", label: "Suppliers", icon: Users },
    { href: "/reports", label: "Reports", icon: BarChart },
  ],
  manager: [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/products", label: "Products", icon: Package },
  ],
  employee: [{ href: "/dashboard", label: "Dashboard", icon: Home }],
};

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const role = "admin"; // TODO: replace with auth context

  const navItems = navConfig[role];

  return (
    <aside
      className={`${
        open ? "w-64" : "w-16"
      } bg-gray-900 text-white h-screen p-4 flex flex-col transition-all duration-300`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="mb-6 flex items-center gap-2 text-sm hover:text-gray-300"
      >
        <Menu size={20} />
        {open && <span>Menu</span>}
      </button>

      <nav className="space-y-2 flex-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition"
          >
            <Icon size={18} />
            {open && label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
