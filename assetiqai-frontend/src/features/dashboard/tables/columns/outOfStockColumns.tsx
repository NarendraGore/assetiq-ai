"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PackageX } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { OutOfStockProduct } from "../../types/dashboard.types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const outOfStockColumns: ColumnDef<OutOfStockProduct>[] = [
  {
    accessorKey: "productName",
    header: "Product",
    cell: ({ row }) => (
      <div className="min-w-[180px]">
        <p className="font-medium text-slate-900 dark:text-slate-100">
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
    accessorKey: "minimumStock",
    header: "Minimum Stock",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.minimumStock}</span>
    ),
  },

  {
    accessorKey: "unitPrice",
    header: "Unit Price",
    cell: ({ row }) => <span>{formatCurrency(row.original.unitPrice)}</span>,
  },

  {
    accessorKey: "stockValue",
    header: "Stock Value",
    cell: ({ row }) => (
      <span className="font-semibold">
        {formatCurrency(row.original.stockValue)}
      </span>
    ),
  },

  {
    id: "status",
    header: "Status",
    cell: () => (
      <Badge
        variant="destructive"
        className="
          gap-1
          border-red-200
          bg-red-50
          text-red-700
          hover:bg-red-100
          dark:border-red-800
          dark:bg-red-950/40
          dark:text-red-300
        "
      >
        <PackageX className="h-3.5 w-3.5" />
        Out Of Stock
      </Badge>
    ),
  },
];
