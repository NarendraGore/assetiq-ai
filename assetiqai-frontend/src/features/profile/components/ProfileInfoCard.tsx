"use client";

import type { LucideIcon } from "lucide-react";

interface ProfileInfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export default function ProfileInfoCard({
  icon: Icon,
  label,
  value,
}: ProfileInfoCardProps) {
  return (
    <div
      className="
        flex
        items-start
        gap-4
        rounded-2xl
        border
        border-border
        bg-background
        p-4
        shadow-sm
        transition-all
        duration-200
        hover:border-primary/40
        hover:shadow-md
       
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-primary/10
          text-primary
         
         
        "
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 break-all text-sm font-medium text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}
