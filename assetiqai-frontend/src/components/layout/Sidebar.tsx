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

  const role = user.role as UserRole;

  const menus: SidebarItem[] = sidebarItems[role] ?? [];

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-background">
      {/* Logo */}
      <div className="border-b border-border px-6 py-6">
        <h1 className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
          AssetIQ
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Asset Management System
        </p>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 space-y-1 overflow-y-auto p-4"
        aria-label="Main Navigation"
      >
        {menus.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                `
                  group
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-blue-500
                `,
                active
                  ? `
                      bg-blue-600
                      text-white
                      shadow-sm
                    `
                  : `
                      text-muted-foreground
                      hover:bg-blue-50
                      hover:text-blue-700
                      dark:hover:bg-blue-950/40
                      dark:hover:text-blue-300
                    `,
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  active
                    ? "text-white"
                    : "text-muted-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400",
                )}
              />

              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="mb-4">
          <p className="font-semibold text-foreground">
            {user.firstName} {user.lastName}
          </p>

          <p className="text-sm text-muted-foreground">{user.role}</p>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full justify-start rounded-xl"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
