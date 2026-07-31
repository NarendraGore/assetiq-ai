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
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center shadow-sm dark:border-border dark:bg-background">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-muted">
        <Icon className="h-8 w-8 text-slate-500 dark:text-muted-foreground" />
      </div>

      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>

      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
