"use client";

import { Column, ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { ProductListItem } from "../types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/formatCurrency";

import ProductActions from "./ProductActions";

interface ProductColumnsProps {
  onView: (product: ProductListItem) => void;
  onEdit: (product: ProductListItem) => void;
  onDelete: (product: ProductListItem) => void;
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

export function productColumns({
  onView,
  onEdit,
  onDelete,
}: ProductColumnsProps): ColumnDef<ProductListItem>[] {
  return [
    {
      accessorKey: "name",

      header: ({ column }) => (
        <SortableHeader column={column} title="Product" />
      ),

      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">
            {row.original.name}
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
      accessorKey: "supplierName",

      header: ({ column }) => (
        <SortableHeader column={column} title="Supplier" />
      ),

      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.supplierName || "—"}
        </span>
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
      accessorKey: "stockQuantity",

      header: ({ column }) => (
        <SortableHeader column={column} title="Stock" />
      ),

      cell: ({ row }) => {
        const stock = row.original.stockQuantity;

        const variant =
          stock === 0 ? "destructive" : stock < 10 ? "secondary" : "outline";

        const label =
          stock === 0
            ? "Out of stock"
            : `${stock.toLocaleString("en-IN")} in stock`;

        return (
          <Badge variant={variant} className="tabular-nums">
            {label}
          </Badge>
        );
      },
    },

    {
      accessorKey: "isActive",

      header: () => <span className="font-semibold text-foreground">Status</span>,

      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "default" : "ghost"}>
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },

    {
      id: "actions",

      enableSorting: false,
      enableHiding: false,

      header: () => <div className="text-right font-semibold">Actions</div>,

      cell: ({ row }) => (
        <div className="flex justify-end">
          <ProductActions
            product={row.original}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ),
    },
  ];
}
