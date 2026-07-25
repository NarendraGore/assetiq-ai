"use client";

import { User } from "lucide-react";

export default function UserMenu() {
  return (
    <button className="flex items-center gap-2 rounded-lg border px-3 py-2">
      <User className="h-5 w-5" />

      <span>Admin</span>
    </button>
  );
}