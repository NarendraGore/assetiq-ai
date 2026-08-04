"use client";

import { LucideIcon, Database } from "lucide-react";

interface EmptyTableProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
}

export default function EmptyTable({
  title = "No records found",
  description = "There are no records available.",
  icon: Icon = Database,
}: EmptyTableProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center shadow-sm">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>

      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
