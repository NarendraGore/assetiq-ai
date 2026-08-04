"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, AlertTriangle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/formatCurrency";

import type { InventoryItem } from "../types";

import InventoryActions from "./InventoryActions";

interface InventoryColumnsProps {
  onStockIn: (item: InventoryItem) => void;
  onStockOut: (item: InventoryItem) => void;
  onAdjust: (item: InventoryItem) => void;
}

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
 * Renders the current-stock cell with a threshold-aware badge:
 * - 0 → destructive "Out of stock"
 * - at/below minimum → amber "Low" with the count
 * - otherwise → neutral count
 */
function StockBadge({ item }: { item: InventoryItem }) {
  const { currentStock, isLowStock } = item;

  if (currentStock === 0) {
    return (
      <Badge variant="destructive" className="tabular-nums">
        <AlertTriangle className="h-3 w-3" />
        Out of stock
      </Badge>
    );
  }

  if (isLowStock) {
    return (
      <Badge className="bg-amber-100 tabular-nums text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
        <AlertTriangle className="h-3 w-3" />
        {currentStock.toLocaleString("en-IN")} · Low
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="tabular-nums">
      {currentStock.toLocaleString("en-IN")} in stock
    </Badge>
  );
}

export function inventoryColumns({
  onStockIn,
  onStockOut,
  onAdjust,
}: InventoryColumnsProps): ColumnDef<InventoryItem>[] {
  return [
    {
      accessorKey: "productName",
      header: ({ column }) => <SortableHeader column={column} title="Product" />,
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">
            {row.original.productName}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.sku}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "categoryName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Category" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.categoryName || "—"}
        </span>
      ),
    },
    {
      accessorKey: "companyName",
      header: ({ column }) => (
        <SortableHeader column={column} title="Supplier" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.companyName || "—"}
        </span>
      ),
    },
    {
      accessorKey: "currentStock",
      header: ({ column }) => <SortableHeader column={column} title="Stock" />,
      cell: ({ row }) => <StockBadge item={row.original} />,
    },
    {
      accessorKey: "minimumStock",
      header: ({ column }) => (
        <SortableHeader column={column} title="Min" className="justify-end" />
      ),
      cell: ({ row }) => (
        <div className="text-right tabular-nums text-muted-foreground">
          {row.original.minimumStock.toLocaleString("en-IN")}
        </div>
      ),
    },
    {
      accessorKey: "unitPrice",
      header: ({ column }) => (
        <SortableHeader column={column} title="Unit Price" />
      ),
      cell: ({ row }) => (
        <span className="font-medium tabular-nums text-foreground">
          {formatCurrency(row.original.unitPrice)}
        </span>
      ),
    },
    {
      accessorKey: "stockValue",
      header: ({ column }) => (
        <SortableHeader column={column} title="Stock Value" />
      ),
      cell: ({ row }) => (
        <span className="font-semibold tabular-nums text-foreground">
          {formatCurrency(row.original.stockValue)}
        </span>
      ),
    },
    {
      id: "actions",
      enableSorting: false,
      enableHiding: false,
      header: () => <div className="text-right font-semibold">Actions</div>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <InventoryActions
            item={row.original}
            onStockIn={onStockIn}
            onStockOut={onStockOut}
            onAdjust={onAdjust}
          />
        </div>
      ),
    },
  ];
}
