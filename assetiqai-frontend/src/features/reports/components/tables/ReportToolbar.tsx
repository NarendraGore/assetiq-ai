"use client";

import type { ReactNode } from "react";
import { RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ExportButton } from "@/shared/components/export";
import type { ExportColumn } from "@/shared/export";

interface ReportToolbarProps<T extends object> {
  title?: string;

  total?: number;

  loading?: boolean;

  onRefresh?: () => void;

  exportFilename?: string;

  exportColumns?: ExportColumn<T>[];

  exportData?: readonly T[];

  actions?: ReactNode;

  children?: ReactNode;
}

export default function ReportToolbar<T extends object>({
  title,
  total,
  loading = false,
  onRefresh,
  exportFilename,
  exportColumns,
  exportData,
  actions,
  children,
}: ReportToolbarProps<T>) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-border
        bg-card
        px-5
        py-4
        shadow-sm
        transition-all
        duration-200

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* Left */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center">
        {(title || typeof total === "number") && (
          <div className="flex items-center gap-3">
            {title && (
              <h2 className="text-sm font-semibold text-foreground">{title}</h2>
            )}

            {typeof total === "number" && (
              <Badge variant="secondary" className="rounded-full px-2.5 py-0.5">
                {total.toLocaleString()} records
              </Badge>
            )}
          </div>
        )}

        {children && <div className="flex flex-1 items-center">{children}</div>}
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={loading}
            aria-label="Refresh report"
            className="
              transition-all
              duration-200
              focus-visible:ring-2
              focus-visible:ring-blue-500
            "
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        )}

        {exportColumns &&
          exportColumns.length > 0 &&
          exportData &&
          exportFilename && (
            <ExportButton
              filename={exportFilename}
              columns={exportColumns}
              data={exportData}
            />
          )}

        {actions}
      </div>
    </div>
  );
}
