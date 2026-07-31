"use client";

import { Table } from "@tanstack/react-table";
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

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

const PAGE_SIZES = [5, 10, 20, 50, 100];

export default function TablePagination<TData>({
  table,
}: TablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;

  const totalRows = table.getFilteredRowModel().rows.length;
  const totalPages = table.getPageCount();

  return (
    <div className="flex flex-col gap-4 border-t bg-white px-6 py-4 md:flex-row md:items-center md:justify-between">
      {/* Left */}
      <div className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-medium text-slate-900">
          {totalRows === 0 ? 0 : pageIndex * pageSize + 1}
        </span>{" "}
        -
        <span className="font-medium text-slate-900">
          {" "}
          {Math.min((pageIndex + 1) * pageSize, totalRows)}
        </span>{" "}
        of <span className="font-medium text-slate-900">{totalRows}</span>{" "}
        records
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">Rows per page</span>

          <Select
            value={String(pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-9 w-20">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {PAGE_SIZES.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Page Info */}
        <div className="text-sm font-medium">
          Page {pageIndex + 1} of {Math.max(totalPages, 1)}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(totalPages - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
