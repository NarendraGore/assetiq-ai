"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  User,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useAuthStore } from "@/store/auth.store";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
     toast.success("Logged out successfully");

    setTimeout(() => {
      router.replace("/login");
    }, 1000);
  };

  const initials =
    `${user?.firstName?.charAt(0) ?? ""}${user?.lastName?.charAt(0) ?? ""}`.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2 hover:bg-muted transition">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{initials || "U"}</AvatarFallback>
          </Avatar>

          <div className="hidden text-left md:block">
            <p className="text-sm font-medium">
              {user
                ? `${user.firstName} ${user.lastName}`
                : "Guest"}
            </p>

            <p className="text-xs text-muted-foreground">
              {user?.role ?? ""}
            </p>
          </div>

          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        <div className="px-3 py-2">
          <p className="font-medium">
            {user
              ? `${user.firstName} ${user.lastName}`
              : "Guest"}
          </p>

          <p className="text-xs text-muted-foreground">
            {user?.email}
          </p>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/profile"
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}