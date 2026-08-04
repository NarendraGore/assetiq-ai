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

import type { InventoryItem } from "../types";

import InventorySkeleton from "./InventorySkeleton";
import InventoryEmptyState from "./InventoryEmptyState";
import ServerPagination from "@/components/tables/ServerPagination";

interface InventoryTableProps {
  columns: ColumnDef<InventoryItem>[];
  data: InventoryItem[];

  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  isFiltered?: boolean;

  onRetry?: () => void;

  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function InventoryTable({
  columns,
  data,
  isLoading = false,
  isFetching = false,
  isError = false,
  isFiltered = false,
  onRetry,
  page,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: InventoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    // Sorting is client-side over the current server page only.
    manualPagination: true,
  });

  if (isLoading) {
    return <InventorySkeleton columns={8} />;
  }

  if (isError) {
    return (
      <InventoryEmptyState
        title="Unable to load inventory"
        description="Something went wrong while loading your stock. Please try again."
        actionLabel="Try again"
        onAction={onRetry}
      />
    );
  }

  if (data.length === 0) {
    return <InventoryEmptyState isSearchResult={isFiltered} />;
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
              <TableRow
                key={row.id}
                className={row.original.isLowStock ? "bg-amber-50/60 dark:bg-amber-900/10" : ""}
              >
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
