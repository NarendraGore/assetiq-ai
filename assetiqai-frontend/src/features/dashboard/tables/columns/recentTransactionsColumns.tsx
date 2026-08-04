"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpCircle, ArrowDownCircle, Pencil } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { RecentTransaction } from "../../types/dashboard.types";

const getTransactionBadge = (type: number) => {
  switch (type) {
    case 1:
      return (
        <Badge
          variant="outline"
          className="border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
        >
          <ArrowUpCircle className="mr-1 h-3.5 w-3.5" />
          Stock In
        </Badge>
      );

    case 2:
      return (
        <Badge
          variant="outline"
          className="border-destructive/30 bg-destructive/10 text-destructive"
        >
          <ArrowDownCircle className="mr-1 h-3.5 w-3.5" />
          Stock Out
        </Badge>
      );

    case 3:
      return (
        <Badge
          variant="outline"
          className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
        >
          <Pencil className="mr-1 h-3.5 w-3.5" />
          Adjustment
        </Badge>
      );

    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export const recentTransactionsColumns: ColumnDef<RecentTransaction>[] = [
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
    accessorKey: "transactionType",
    header: "Type",
    cell: ({ row }) => getTransactionBadge(row.original.transactionType),
  },

  {
    accessorKey: "quantity",
    header: "Qty",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.quantity}</span>
    ),
  },

  {
    accessorKey: "previousQuantity",
    header: "Previous",
    cell: ({ row }) => row.original.previousQuantity,
  },

  {
    accessorKey: "newQuantity",
    header: "New",
    cell: ({ row }) => (
      <span className="font-semibold text-primary">
        {row.original.newQuantity}
      </span>
    ),
  },

  {
    accessorKey: "createdBy",
    header: "User",
    cell: ({ row }) => (
      <div className="max-w-[160px] truncate">{row.original.createdBy}</div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);

      return (
        <div className="text-sm">
          <p>{date.toLocaleDateString()}</p>
          <p className="text-xs text-muted-foreground">
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "remarks",
    header: "Remarks",
    cell: ({ row }) => (
      <div
        className="max-w-[220px] truncate text-muted-foreground"
        title={row.original.remarks}
      >
        {row.original.remarks || "-"}
      </div>
    ),
  },
];
