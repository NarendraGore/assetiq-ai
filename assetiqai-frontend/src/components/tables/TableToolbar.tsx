"use client";

import { Search, RefreshCw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TableToolbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;

  totalRecords?: number;

  onRefresh?: () => void;
  isRefreshing?: boolean;

  children?: React.ReactNode;
}

export default function TableToolbar({
  search = "",
  onSearchChange,
  totalRecords,
  onRefresh,
  isRefreshing = false,
  children,
}: TableToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors duration-200 md:flex-row md:items-center md:justify-between">
      {/* Left Section - Search and Filters */}
      <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">
        {onSearchChange && (
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200" />

            <Input
              value={search}
              placeholder="Search..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 bg-background border-border focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              aria-label="Search records"
            />
          </div>
        )}

        {children}
      </div>

      {/* Right Section - Total Records and Refresh */}
      <div className="flex items-center justify-between gap-4 md:justify-end">
        {typeof totalRecords === "number" && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Total Records:
            </span>
            <span className="text-sm font-semibold text-foreground">
              {totalRecords}
            </span>
          </div>
        )}

        {onRefresh && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="border-border hover:border-blue-200 hover:bg-muted transition-all duration-200 dark:hover:border-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-border"
            aria-label={isRefreshing ? "Refreshing..." : "Refresh data"}
          >
            <RefreshCw
              className={`h-4 w-4 transition-transform duration-300 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
          </Button>
        )}
      </div>
    </div>
  );
}
