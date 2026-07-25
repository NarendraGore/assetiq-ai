"use client";

import { Bell } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">

      <input
        type="text"
        placeholder="Search..."
        className="w-72 rounded-lg border px-3 py-2 outline-none"
      />

      <div className="flex items-center gap-4">

        <button className="rounded-lg border p-2">
          <Bell className="h-5 w-5" />
        </button>

        <ThemeToggle />

        <UserMenu />

      </div>

    </header>
  );
}