"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGE_SIZES = [5, 10, 20, 50, 100];

interface ServerPaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

/**
 * Server-driven pagination bar shared by the Inventory and History tables.
 * Reads page state from the API response rather than a TanStack row model.
 * Mirrors `ProductServerPagination` so the two features look identical.
 */
export default function ServerPagination({
  page,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: ServerPaginationProps) {
  const safeTotalPages = Math.max(totalPages, 1);

  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);

  const canPrevious = page > 1;
  const canNext = page < safeTotalPages;

  return (
    <div className="flex flex-col gap-4 border-t border-border bg-card px-6 py-4 transition-colors duration-200 md:flex-row md:items-center md:justify-between">
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium text-foreground">{from}</span> -
        <span className="font-medium text-foreground"> {to}</span> of{" "}
        <span className="font-medium text-foreground">{totalCount}</span>{" "}
        records
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>

          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-9 w-20 border-border bg-background transition-colors duration-200 hover:bg-muted">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="border-border bg-popover">
              {PAGE_SIZES.map((size) => (
                <SelectItem
                  key={size}
                  value={String(size)}
                  className="cursor-pointer hover:bg-muted focus:bg-accent"
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm font-medium text-foreground">
          Page {page} of {safeTotalPages}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            disabled={!canPrevious}
            className="border-border transition-all duration-200 hover:border-primary/40 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-transparent"
            aria-label="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(page - 1)}
            disabled={!canPrevious}
            className="border-border transition-all duration-200 hover:border-primary/40 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-transparent"
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(page + 1)}
            disabled={!canNext}
            className="border-border transition-all duration-200 hover:border-primary/40 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-transparent"
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(safeTotalPages)}
            disabled={!canNext}
            className="border-border transition-all duration-200 hover:border-primary/40 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border disabled:hover:bg-transparent"
            aria-label="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
