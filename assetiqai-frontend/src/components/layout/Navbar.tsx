"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => ({
    label:
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
    href: "/" + segments.slice(0, index + 1).join("/"),
  }));
}

export default function Navbar() {
  const pathname = usePathname();

  const { resolvedTheme, setTheme } = useTheme();

  const breadcrumbs = useMemo(() => getBreadcrumbs(pathname), [pathname]);

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-16
        shrink-0
        items-center
        justify-between
        border-b
        border-border
        bg-background/95
        px-6
        backdrop-blur
      "
    >
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        <SidebarTrigger className="-ml-2" />

        <Separator orientation="vertical" className="h-5" />

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <div key={item.href} className="flex items-center">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {!isLast && <BreadcrumbSeparator />}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right */}
      <div
        className="
          flex
          items-center
          gap-2
          rounded-2xl
          border
          border-border
          bg-card
          p-1
          shadow-sm
        "
      >
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="
            rounded-xl
            transition-all
            duration-200
            hover:bg-muted
            focus-visible:ring-2
            focus-visible:ring-blue-500
          "
        >
          <Bell className="h-5 w-5 text-muted-foreground" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle Theme"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="
            rounded-xl
            transition-all
            duration-200
            hover:bg-muted
            focus-visible:ring-2
            focus-visible:ring-blue-500
          "
        >
          {resolvedTheme === "dark" ? (
            <Sun className="h-5 w-5 text-amber-500" />
          ) : (
            <Moon className="h-5 w-5 text-muted-foreground" />
          )}
        </Button>
      </div>
    </header>
  );
}
