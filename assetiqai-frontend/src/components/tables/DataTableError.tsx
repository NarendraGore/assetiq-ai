"use client";

import { AlertCircle, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DataTableErrorProps {
  message?: string;
  onRetry?: () => void;
}

export default function DataTableError({
  message = "Failed to load data. Please try again.",
  onRetry,
}: DataTableErrorProps) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-red-200 bg-white px-6 py-12 text-center shadow-sm dark:border-red-900/30 dark:bg-background">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
        <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
      </div>

      <h3 className="text-xl font-semibold text-slate-900 dark:text-foreground">
        Failed to load data
      </h3>

      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-muted-foreground">
        {message}
      </p>

      {onRetry && (
        <Button type="button" className="mt-6" onClick={onRetry}>
          <RotateCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      )}
    </div>
  );
}
