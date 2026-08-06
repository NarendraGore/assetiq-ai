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

import { ProductListItem } from "../types";

import ProductSkeleton from "./ProductSkeleton";
import ProductEmptyState from "./ProductEmptyState";
import ServerPagination from "@/components/tables/ServerPagination";

interface ProductTableProps {
  columns: ColumnDef<ProductListItem>[];
  data: ProductListItem[];

  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;


  isFiltered?: boolean;

  onRetry?: () => void;
  onAddProduct?: () => void;
  onRowClick?: (product: ProductListItem) => void;


  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function ProductTable({
  columns,
  data,

  isLoading = false,
  isFetching = false,
  isError = false,

  isFiltered = false,

  onRetry,
  onAddProduct,
  onRowClick,

  page,
  pageSize,
  totalCount,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: ProductTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    onSortingChange: setSorting,

    state: {
      sorting,
    },


    manualPagination: true,
  });

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (isError) {
    return (
      <ProductEmptyState
        title="Unable to load products"
        description="Something went wrong while loading products."
        actionLabel="Retry"
        onAction={onRetry}
      />
    );
  }

  if (data.length === 0) {
    return (
      <ProductEmptyState
        isSearchResult={isFiltered}
        onAction={onAddProduct}
      />
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div
        className={
          isFetching
            ? "overflow-x-auto pointer-events-none opacity-60 transition-opacity"
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
                onClick={() => onRowClick?.(row.original)}
                className={onRowClick ? "cursor-pointer hover:bg-muted" : ""}
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
