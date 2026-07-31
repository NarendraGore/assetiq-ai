"use client";

import * as React from "react";

import {
  ColumnDef,
  SortingState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import TablePagination from "./TablePagination";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  enableSorting?: boolean;
  enablePagination?: boolean;

  pageSize?: number;

  onRowClick?: (row: TData) => void;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  enableSorting = true,
  enablePagination = true,
  pageSize = 5,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),

    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,

    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,

    onSortingChange: setSorting,
    onPaginationChange: setPagination,

    state: {
      sorting,
      pagination,
    },
  });

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:bg-background">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-muted">
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
                className={
                  onRowClick
                    ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-muted"
                    : ""
                }
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

      {enablePagination && <TablePagination table={table} />}
    </div>
  );
}
