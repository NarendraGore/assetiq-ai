"use client";

import { Bell, Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";


import { Avatar, AvatarFallback, AvatarImage } from "radix-ui/avatar";


export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 shadow px-6 py-3">
      <h1 className="text-lg font-bold text-gray-900 dark:text-white">
        AssetIQAI
      </h1>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="cursor-pointer h-9 w-9">
              <AvatarImage src="/avatar.png" alt="Profile" />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}