"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserRole } from "@/features/auth/types/auth.types";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { sidebarItems } from "./sidebar.config";
import SidebarProfile from "./SidebarProfile";

export default function AppSidebar() {
  const pathname = usePathname();

  const { user } = useAuth();

  if (!user) return null;

  const groups = sidebarItems[user.role as UserRole] ?? [];

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-sidebar-border"
    >
      <SidebarHeader className="border-b border-sidebar-border px-2 py-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" tooltip="ASSETIQ AI">
              <Link href="/dashboard">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-primary
                    font-bold
                    text-primary-foreground
                    shadow-sm
                  "
                >
                  A
                </div>

                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-semibold">ASSETIQ AI</span>

                  <span className="truncate text-xs text-muted-foreground">
                    Asset Management Platform
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="py-3">
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={active}
                      >
                        <Link href={item.href}>
                          <Icon className="h-5 w-5 shrink-0" />

                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarProfile />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
