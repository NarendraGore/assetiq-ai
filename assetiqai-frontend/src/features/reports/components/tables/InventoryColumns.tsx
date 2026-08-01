"use client";

import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { formatCurrency } from "@/lib/utils/formatCurrency";

import type { InventoryReport } from "../../types";

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

function TruncatedCell({
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

export const inventoryColumns: ColumnDef<InventoryReport>[] = [
  {
    accessorKey: "productName",
    header: ({ column }) => <SortableHeader column={column} title="Product" />,
    cell: ({ row }) => (
      <div className="font-medium text-foreground">
        <TruncatedCell value={row.original.productName} />
      </div>
    ),
  },

  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-mono text-xs">
        {row.original.sku}
      </Badge>
    ),
  },

  {
    accessorKey: "categoryName",
    header: ({ column }) => <SortableHeader column={column} title="Category" />,
    cell: ({ row }) => <TruncatedCell value={row.original.categoryName} />,
  },

  {
    accessorKey: "supplierName",
    header: ({ column }) => <SortableHeader column={column} title="Supplier" />,
    cell: ({ row }) => <TruncatedCell value={row.original.supplierName} />,
  },

  {
    accessorKey: "currentStock",
    header: ({ column }) => <SortableHeader column={column} title="Quantity" />,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        {row.original.currentStock.toLocaleString()}
      </div>
    ),
  },

  {
    accessorKey: "minimumStock",
    header: ({ column }) => (
      <SortableHeader column={column} title="Minimum Stock" />
    ),
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Badge variant={row.original.isLowStock ? "destructive" : "secondary"}>
          {row.original.minimumStock}
        </Badge>
      </div>
    ),
  },

  {
    accessorKey: "unitPrice",
    header: ({ column }) => (
      <SortableHeader column={column} title="Unit Price" />
    ),
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        {formatCurrency(row.original.unitPrice)}
      </div>
    ),
  },

  {
    accessorKey: "stockValue",
    header: ({ column }) => (
      <SortableHeader column={column} title="Total Value" />
    ),
    cell: ({ row }) => (
      <div className="text-right font-semibold tabular-nums">
        {formatCurrency(row.original.stockValue)}
      </div>
    ),
  },

  {
    id: "updatedAt",
    header: ({ column }) => (
      <SortableHeader column={column} title="Last Updated" />
    ),
    cell: () => (
      <span className="whitespace-nowrap text-muted-foreground">—</span>
    ),
  },
];
