"use client";

import { Search, RefreshCw } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TableToolbarProps {
  search?: string;
  onSearchChange?: (value: string) => void;

  totalRecords?: number;

  onRefresh?: () => void;

  children?: React.ReactNode;
}

export default function TableToolbar({
  search = "",
  onSearchChange,
  totalRecords,
  onRefresh,
  children,
}: TableToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Left */}
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        {onSearchChange && (
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              value={search}
              placeholder="Search..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        )}

        {children}
      </div>

      {/* Right */}
      <div className="flex items-center justify-between gap-3 md:justify-end">
        {typeof totalRecords === "number" && (
          <span className="text-sm text-slate-500">
            Total Records:
            <span className="ml-1 font-semibold text-slate-900">
              {totalRecords}
            </span>
          </span>
        )}

        {onRefresh && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
