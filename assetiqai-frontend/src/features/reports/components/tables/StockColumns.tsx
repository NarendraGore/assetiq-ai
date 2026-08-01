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

function SortableHeader({
  column,
  title,
}: {
  column: {
    toggleSorting: (desc?: boolean) => void;
    getIsSorted: () => false | "asc" | "desc";
  };
  title: string;
}) {
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
        hover:bg-muted
        hover:text-foreground
      "
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}

function Ellipsis({
  value,
  width = "max-w-[180px]",
}: {
  value: string;
  width?: string;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`block truncate ${width}`}>{value}</span>
        </TooltipTrigger>

        <TooltipContent>
          <p>{value}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function getTransactionLabel(type: number): string {
  switch (type) {
    case 1:
      return "IN";

    case 2:
      return "OUT";

    case 3:
      return "TRANSFER";

    case 4:
      return "ADJUSTMENT";

    default:
      return "UNKNOWN";
  }
}

function getTransactionClass(type: number): string {
  switch (type) {
    case 1:
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";

    case 2:
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

    case 3:
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";

    case 4:
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";

    default:
      return "bg-muted text-muted-foreground";
  }
}

export const stockColumns: ColumnDef<StockReport>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => <SortableHeader column={column} title="Product" />,
    cell: ({ row }) => (
      <div className="font-medium text-foreground">
        <Ellipsis value={row.original.productName} width="max-w-[220px]" />
      </div>
    ),
  },

  {
    accessorKey: "transactionType",
    header: ({ column }) => (
      <SortableHeader column={column} title="Transaction Type" />
    ),
    cell: ({ row }) => (
      <Badge
        variant="secondary"
        className={`
          rounded-full
          px-2.5
          py-0.5
          border-0
          font-medium
          ${getTransactionClass(row.original.transactionType)}
        `}
      >
        {getTransactionLabel(row.original.transactionType)}
      </Badge>
    ),
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => <SortableHeader column={column} title="Quantity" />,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        {row.original.quantity.toLocaleString()}
      </div>
    ),
  },

  {
    accessorKey: "remarks",
    header: ({ column }) => (
      <SortableHeader column={column} title="Reference" />
    ),
    cell: ({ row }) => (
      <Ellipsis value={row.original.remarks ?? "-"} width="max-w-[220px]" />
    ),
  },

  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <SortableHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => (
      <Ellipsis value={row.original.createdBy} width="max-w-[150px]" />
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableHeader column={column} title="Date" />,
    cell: ({ row }) => (
      <span className="whitespace-nowrap text-muted-foreground">
        {format(new Date(row.original.createdAt), "dd MMM yyyy")}
      </span>
    ),
  },
];
