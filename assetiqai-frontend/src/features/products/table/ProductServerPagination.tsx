"use client";

import { Table as TanstackTable } from "@tanstack/react-table";
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

interface ProductServerPaginationProps<TData> {
  /** Present only to keep the table generic — not used for row counts. */
  table?: TanstackTable<TData>;

  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;

  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

/**
 * Server-driven pagination bar.
 *
 * Unlike the shared client-side {@link TablePagination}, this reads page state
 * from the API response (the product list is paged on the server) rather than
 * from the TanStack row model.
 */
export default function ProductServerPagination<TData>({
  page,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: ProductServerPaginationProps<TData>) {
  const safeTotalPages = Math.max(totalPages, 1);

  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);

  const canPrevious = page > 1;
  const canNext = page < safeTotalPages;

  return (
    <div className="flex flex-col gap-4 border-t border-border bg-card px-6 py-4 transition-colors duration-200 md:flex-row md:items-center md:justify-between">
      {/* Left - Records Info */}
      <div className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">{from}</span> -
        <span className="font-medium text-foreground"> {to}</span> of{" "}
        <span className="font-medium text-foreground">{totalCount}</span>{" "}
        records
      </div>

      {/* Right - Controls */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Rows per page selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>

          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-9 w-20 border-border bg-background hover:bg-muted transition-colors duration-200">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="bg-popover border-border">
              {PAGE_SIZES.map((size) => (
                <SelectItem
                  key={size}
                  value={String(size)}
                  className="hover:bg-muted cursor-pointer focus:bg-accent"
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page info */}
        <div className="text-sm font-medium text-foreground">
          Page {page} of {safeTotalPages}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            disabled={!canPrevious}
            className="border-border hover:border-primary/40 hover:bg-muted transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-border"
            aria-label="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(page - 1)}
            disabled={!canPrevious}
            className="border-border hover:border-primary/40 hover:bg-muted transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-border"
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(page + 1)}
            disabled={!canNext}
            className="border-border hover:border-primary/40 hover:bg-muted transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-border"
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(safeTotalPages)}
            disabled={!canNext}
            className="border-border hover:border-primary/40 hover:bg-muted transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-border"
            aria-label="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
