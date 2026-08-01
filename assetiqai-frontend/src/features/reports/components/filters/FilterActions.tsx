"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ExportButton } from "../export";

import { useReportFilter } from "../../hooks/useReportFilter";

interface FilterActionsProps {
  loading?: boolean;
}

export default function FilterActions({ loading = false }: FilterActionsProps) {
  const { filter, resetFilters } = useReportFilter();

  const hasFilters =
    filter.search.trim() !== "" ||
    filter.categoryId !== undefined ||
    filter.supplierId !== undefined ||
    filter.transactionType !== undefined ||
    filter.dateRange.from !== undefined ||
    filter.dateRange.to !== undefined;

  return (
    <div className="flex w-full items-center justify-end gap-2 md:w-auto">
      <Button
        type="button"
        variant="outline"
        disabled={!hasFilters || loading}
        onClick={resetFilters}
        className="
          border-border
          bg-background
          shadow-sm
          transition-all
          duration-200
          hover:bg-muted
          focus-visible:ring-2
          focus-visible:ring-blue-500
        "
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>

      <ExportButton disabled={loading} loading={false} />
    </div>
  );
}
