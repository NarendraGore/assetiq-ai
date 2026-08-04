"use client";

import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { StockReport } from "../../types";

interface SortableHeaderProps {
  column: {
    toggleSorting: (desc?: boolean) => void;
    getIsSorted: () => false | "asc" | "desc";
  };
  title: string;
}

function SortableHeader({ column, title }: SortableHeaderProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="
        -ml-3
        h-8
        px-2
        text-muted-foreground
        transition-colors
        duration-200
        hover:bg-muted
        hover:text-foreground
        focus-visible:ring-2
        focus-visible:ring-ring
      "
    >
      {title}

      <ArrowUpDown className="ml-2 h-4 w-4 shrink-0" />
    </Button>
  );
}

interface EllipsisProps {
  value: string;
  width?: string;
}

function Ellipsis({ value, width = "max-w-[180px]" }: EllipsisProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            aria-label={value}
            className={`
              block
              truncate
              ${width}
            `}
          >
            {value}
          </span>
        </TooltipTrigger>

        <TooltipContent side="top">
          <p>{value}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function getTransactionLabel(type: number): string {
  switch (type) {
    case 1:
      return "Stock In";

    case 2:
      return "Stock Out";

    case 3:
      return "Transfer";

    case 4:
      return "Adjustment";

    default:
      return "Unknown";
  }
}

function getTransactionClass(type: number): string {
  switch (type) {
    case 1:
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";

    case 2:
      return "bg-destructive/10 text-destructive";

    case 3:
      return "bg-primary/10 text-primary";

    case 4:
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";

    default:
      return "bg-muted text-muted-foreground";
  }
}

export const stockColumns: ColumnDef<StockReport>[] = [
  {
    accessorKey: "productName",
    enableSorting: true,

    header: ({ column }) => <SortableHeader column={column} title="Product" />,

    cell: ({ row }) => (
      <div className="font-medium text-foreground">
        <Ellipsis value={row.original.productName} width="max-w-[220px]" />
      </div>
    ),
  },

  {
    accessorKey: "sku",
    enableSorting: true,

    header: ({ column }) => <SortableHeader column={column} title="SKU" />,

    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="
          whitespace-nowrap
          font-mono
          text-xs
        "
      >
        {row.original.sku}
      </Badge>
    ),
  },

  {
    accessorKey: "transactionType",
    enableSorting: true,

    header: ({ column }) => (
      <SortableHeader column={column} title="Transaction" />
    ),

    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={`
          whitespace-nowrap
          rounded-full
          border-0
          px-2.5
          py-0.5
          font-medium
          transition-colors
          duration-200
          ${getTransactionClass(row.original.transactionType)}
        `}
      >
        {getTransactionLabel(row.original.transactionType)}
      </Badge>
    ),
  },

  {
    accessorKey: "quantity",
    enableSorting: true,

    header: ({ column }) => <SortableHeader column={column} title="Quantity" />,

    cell: ({ row }) => {
      const isStockOut = row.original.transactionType === 2;

      return (
        <div
          className={`
            text-right
            font-medium
            tabular-nums
            whitespace-nowrap
            transition-colors
            duration-200
            ${
              isStockOut
                ? "text-destructive"
                : "text-emerald-600 dark:text-emerald-400"
            }
          `}
        >
          {row.original.quantity.toLocaleString()}
        </div>
      );
    },
  },

  {
    accessorKey: "previousQuantity",
    enableSorting: true,

    header: ({ column }) => <SortableHeader column={column} title="Previous" />,

    cell: ({ row }) => (
      <div
        className="
          text-right
          tabular-nums
          whitespace-nowrap
          text-muted-foreground
        "
      >
        {row.original.previousQuantity.toLocaleString()}
      </div>
    ),
  },

  {
    accessorKey: "newQuantity",
    enableSorting: true,

    header: ({ column }) => <SortableHeader column={column} title="New" />,

    cell: ({ row }) => (
      <div
        className="
          text-right
          font-semibold
          tabular-nums
          whitespace-nowrap
          text-foreground
        "
      >
        {row.original.newQuantity.toLocaleString()}
      </div>
    ),
  },

  {
    accessorKey: "remarks",
    enableSorting: true,

    header: ({ column }) => <SortableHeader column={column} title="Remarks" />,

    cell: ({ row }) => (
      <Ellipsis value={row.original.remarks || "—"} width="max-w-[240px]" />
    ),
  },

  {
    accessorKey: "createdBy",
    enableSorting: true,

    header: ({ column }) => (
      <SortableHeader column={column} title="Created By" />
    ),

    cell: ({ row }) => (
      <Ellipsis value={row.original.createdBy} width="max-w-[160px]" />
    ),
  },

  {
    accessorKey: "createdAt",
    enableSorting: true,

    header: ({ column }) => <SortableHeader column={column} title="Date" />,

    cell: ({ row }) => (
      <span className="whitespace-nowrap text-muted-foreground">
        {format(new Date(row.original.createdAt), "dd MMM yyyy")}
      </span>
    ),
  },
];
