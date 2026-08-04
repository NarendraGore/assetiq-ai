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

interface TruncatedCellProps {
  value: string;
  width?: string;
}

function TruncatedCell({ value, width = "max-w-[180px]" }: TruncatedCellProps) {
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

export const inventoryColumns: ColumnDef<InventoryReport>[] = [
  {
    accessorKey: "productName",
    enableSorting: true,

    header: ({ column }) => <SortableHeader column={column} title="Product" />,

    cell: ({ row }) => (
      <div className="font-medium text-foreground">
        <TruncatedCell value={row.original.productName} width="max-w-[220px]" />
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
    accessorKey: "categoryName",
    enableSorting: true,

    header: ({ column }) => <SortableHeader column={column} title="Category" />,

    cell: ({ row }) => <TruncatedCell value={row.original.categoryName} />,
  },

  {
    accessorKey: "supplierName",
    enableSorting: true,

    header: ({ column }) => <SortableHeader column={column} title="Supplier" />,

    cell: ({ row }) => <TruncatedCell value={row.original.supplierName} />,
  },

  {
    accessorKey: "currentStock",
    enableSorting: true,

    header: ({ column }) => <SortableHeader column={column} title="Quantity" />,

    cell: ({ row }) => {
      const { currentStock, isLowStock, isOutOfStock } = row.original;

      return (
        <div
          className={`
            text-right
            font-medium
            tabular-nums
            transition-colors
            duration-200
            ${
              isOutOfStock
                ? "text-destructive"
                : isLowStock
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-foreground"
            }
          `}
        >
          {currentStock.toLocaleString()}
        </div>
      );
    },
  },

  {
    accessorKey: "minimumStock",
    enableSorting: true,

    header: ({ column }) => (
      <SortableHeader column={column} title="Minimum Stock" />
    ),

    cell: ({ row }) => {
      const { minimumStock, isLowStock, isOutOfStock } = row.original;

      return (
        <div className="flex justify-end">
          {isOutOfStock ? (
            <Badge variant="destructive">Out of Stock</Badge>
          ) : (
            <Badge variant={isLowStock ? "destructive" : "secondary"}>
              {minimumStock}
            </Badge>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "unitPrice",
    enableSorting: true,

    header: ({ column }) => (
      <SortableHeader column={column} title="Unit Price" />
    ),

    cell: ({ row }) => (
      <div
        className="
          text-right
          font-medium
          tabular-nums
          whitespace-nowrap
        "
      >
        {formatCurrency(row.original.unitPrice)}
      </div>
    ),
  },

  {
    accessorKey: "stockValue",
    enableSorting: true,

    header: ({ column }) => (
      <SortableHeader column={column} title="Total Value" />
    ),

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
        {formatCurrency(row.original.stockValue)}
      </div>
    ),
  },

  {
    id: "status",

    header: "Status",

    enableSorting: false,

    cell: ({ row }) => {
      const { isActive, isOutOfStock, isLowStock } = row.original;

      if (!isActive) {
        return (
          <Badge variant="secondary" className="whitespace-nowrap">
            Inactive
          </Badge>
        );
      }

      if (isOutOfStock) {
        return (
          <Badge variant="destructive" className="whitespace-nowrap">
            Out of Stock
          </Badge>
        );
      }

      if (isLowStock) {
        return (
          <Badge
            className="
              whitespace-nowrap
              bg-amber-100
              text-amber-700
              hover:bg-amber-100
              dark:bg-amber-900/30
              dark:text-amber-400
            "
          >
            Low Stock
          </Badge>
        );
      }

      return (
        <Badge
          className="
            whitespace-nowrap
            bg-emerald-100
            text-emerald-700
            hover:bg-emerald-100
            dark:bg-emerald-900/30
            dark:text-emerald-400
          "
        >
          In Stock
        </Badge>
      );
    },
  },
];
