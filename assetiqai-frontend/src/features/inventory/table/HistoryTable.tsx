"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { StockTransaction } from "../types";

import InventorySkeleton from "./InventorySkeleton";
import InventoryEmptyState from "./InventoryEmptyState";
import ServerPagination from "./ServerPagination";

interface HistoryTableProps {
  columns: ColumnDef<StockTransaction>[];
  data: StockTransaction[];

  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  isFiltered?: boolean;

  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

/**
 * Server-paginated transaction history table. Sorting is client-side over the
 * current page; paging is driven by the API response. Shares the skeleton,
 * empty-state and pagination primitives with the Inventory table.
 */
export default function HistoryTable({
  columns,
  data,
  isLoading = false,
  isFetching = false,
  isError = false,
  isFiltered = false,
  page,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: HistoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    manualPagination: true,
  });

  if (isLoading) {
    return <InventorySkeleton columns={8} />;
  }

  if (isError) {
    return (
      <InventoryEmptyState
        title="Unable to load history"
        description="Something went wrong while loading stock transactions. Please try again."
      />
    );
  }

  if (data.length === 0) {
    return (
      <InventoryEmptyState
        isSearchResult={isFiltered}
        title={isFiltered ? "No matching transactions" : "No transactions yet"}
        description={
          isFiltered
            ? "Try adjusting your filters to find what you're looking for."
            : "Stock movements will appear here as you add, remove or adjust stock."
        }
      />
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div
        className={
          isFetching
            ? "pointer-events-none overflow-x-auto opacity-60 transition-opacity"
            : "overflow-x-auto transition-opacity"
        }
        aria-busy={isFetching}
      >
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ServerPagination
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </section>
  );
}
