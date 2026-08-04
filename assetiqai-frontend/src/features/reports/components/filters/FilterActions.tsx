"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useReportFilter } from "../../hooks/useReportFilter";

interface FilterActionsProps {
  loading?: boolean;
}

export default function FilterActions({ loading = false }: FilterActionsProps) {
  const { filter, resetFilters } = useReportFilter();

  const hasFilters =
    filter.search.trim().length > 0 ||
    filter.categoryId !== undefined ||
    filter.supplierId !== undefined ||
    filter.transactionType !== undefined ||
    filter.dateRange.from !== undefined ||
    filter.dateRange.to !== undefined;

  return (
    <div
      className="
        flex
        w-full
        justify-end
        md:w-auto
      "
    >
      <Button
        type="button"
        variant="outline"
        size="default"
        onClick={resetFilters}
        disabled={!hasFilters || loading}
        aria-label="Reset report filters"
        className="
          h-10
          rounded-xl
          border-border
          bg-background
          shadow-sm
          transition-all
          duration-200
          hover:bg-muted
          focus-visible:ring-2
          focus-visible:ring-ring
          disabled:pointer-events-none
          disabled:opacity-50
        "
      >
        <RotateCcw
          className={`
            mr-2
            h-4
            w-4
            ${loading ? "animate-spin" : ""}
          `}
        />
        Reset Filters
      </Button>
    </div>
  );
}
