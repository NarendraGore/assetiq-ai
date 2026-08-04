"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { LowStockProduct } from "../../types/dashboard.types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const lowStockColumns: ColumnDef<LowStockProduct>[] = [
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => (
      <div className="min-w-[180px]">
        <p className="font-medium text-foreground">
          {row.original.productName}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "sku",
    header: "SKU",
    cell: ({ row }) => (
      <span className="font-mono text-sm text-muted-foreground">
        {row.original.sku}
      </span>
    ),
  },

  {
    accessorKey: "categoryName",
    header: "Category",
    cell: ({ row }) => <span>{row.original.categoryName}</span>,
  },

  {
    accessorKey: "companyName",
    header: "Supplier",
    cell: ({ row }) => (
      <div className="max-w-[180px] truncate">{row.original.companyName}</div>
    ),
  },

  {
    accessorKey: "currentStock",
    header: "Current",
    cell: ({ row }) => (
      <span className="font-semibold text-destructive">
        {row.original.currentStock}
      </span>
    ),
  },

  {
    accessorKey: "minimumStock",
    header: "Minimum",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.minimumStock}</span>
    ),
  },

  {
    accessorKey: "stockValue",
    header: "Stock Value",
    cell: ({ row }) => (
      <span className="font-medium">
        {formatCurrency(row.original.stockValue)}
      </span>
    ),
  },

  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="
          border-amber-200
          bg-amber-50
          text-amber-700
          dark:border-amber-800
          dark:bg-amber-950/40
          dark:text-amber-300
        "
      >
        <AlertTriangle className="mr-1 h-3.5 w-3.5" />
        Low Stock
      </Badge>
    ),
  },
];
