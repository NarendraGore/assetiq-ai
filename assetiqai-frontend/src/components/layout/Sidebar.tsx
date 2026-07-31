"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserRole } from "@/features/auth/types/auth.types";

import { sidebarItems, type SidebarItem } from "./sidebar.config";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, logout } = useAuth();

  if (!user) return null;

  // Temporary cast until User.role is typed as UserRole
  const role = user.role as UserRole;

  const menus: SidebarItem[] = sidebarItems[role] ?? [];

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-blue-600">AssetIQ</h1>

        <p className="mt-1 text-sm text-slate-500">Asset Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {menus.map((item: SidebarItem) => {
          const Icon = item.icon;

          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                active
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              )}
            >
              <Icon className="h-5 w-5" />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="mb-4">
          <p className="font-medium">
            {user.firstName} {user.lastName}
          </p>

          <p className="text-sm text-slate-500">{user.role}</p>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
