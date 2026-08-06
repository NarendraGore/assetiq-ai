"use client";

import { ArrowUpDown } from "lucide-react";
import { Column, ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { StockTransaction } from "../types";
import { getTransactionClass, getTransactionLabel } from "../constants";

interface SortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
}

function SortableHeader<TData, TValue>({
  column,
  title,
  className,
}: SortableHeaderProps<TData, TValue>) {
  return (
    <Button
      variant="ghost"
      className={`h-auto p-0 font-semibold text-foreground hover:bg-transparent ${
        className ?? ""
      }`}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
    </Button>
  );
}

/**
 * Columns for the stock-transaction History table. The signed movement column
 * colours Stock In green and Stock Out red; Adjustment shows its raw signed
 * delta so a correction reads naturally.
 */
export const historyColumns: ColumnDef<StockTransaction>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="whitespace-nowrap font-medium text-foreground">
          {format(new Date(row.original.createdAt), "dd MMM yyyy")}
        </span>
        <span className="whitespace-nowrap text-xs text-muted-foreground">
          {format(new Date(row.original.createdAt), "hh:mm a")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "productName",
    header: ({ column }) => <SortableHeader column={column} title="Product" />,
    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        {row.original.productName}
      </span>
    ),
  },
  {
    accessorKey: "transactionType",
    header: ({ column }) => (
      <SortableHeader column={column} title="Transaction" />
    ),
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={`whitespace-nowrap rounded-full border-0 px-2.5 py-0.5 font-medium ${getTransactionClass(
          row.original.transactionType,
        )}`}
      >
        {getTransactionLabel(row.original.transactionType)}
      </Badge>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <SortableHeader column={column} title="Change" className="justify-end" />
    ),
    cell: ({ row }) => {
      const isStockOut = row.original.transactionType === 2;
      const sign = isStockOut ? "-" : "+";

      return (
        <div
          className={`text-right font-semibold tabular-nums ${
            isStockOut
              ? "text-destructive"
              : "text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {sign}
          {row.original.quantity.toLocaleString("en-IN")}
        </div>
      );
    },
  },
  {
    accessorKey: "previousQuantity",
    header: ({ column }) => (
      <SortableHeader column={column} title="Previous" className="justify-end" />
    ),
    cell: ({ row }) => (
      <div className="text-right tabular-nums text-muted-foreground">
        {row.original.previousQuantity.toLocaleString("en-IN")}
      </div>
    ),
  },
  {
    accessorKey: "newQuantity",
    header: ({ column }) => (
      <SortableHeader column={column} title="New" className="justify-end" />
    ),
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums text-foreground">
        {row.original.newQuantity.toLocaleString("en-IN")}
      </div>
    ),
  },
  {
    accessorKey: "remarks",
    enableSorting: false,
    header: () => <span className="font-semibold">Remarks</span>,
    cell: ({ row }) => (
      <span className="block max-w-[240px] truncate text-muted-foreground">
        {row.original.remarks || "—"}
      </span>
    ),
  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <SortableHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-muted-foreground">
        {row.original.createdBy}
      </span>
    ),
  },
];
