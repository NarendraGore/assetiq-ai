"use client";

import { Column, ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Supplier } from "../types";

import { Button } from "@/components/ui/button";

import SupplierActions from "./SupplierActions";

interface SupplierColumnsProps {
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const formatDate = (value?: string) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return dateFormatter.format(date);
};

interface SortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

function SortableHeader<TData, TValue>({
  column,
  title,
}: SortableHeaderProps<TData, TValue>) {
  return (
    <Button
      variant="ghost"
      className="h-auto p-0 font-semibold text-foreground hover:bg-transparent"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}

      <ArrowUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
    </Button>
  );
}

export function supplierColumns({
  onEdit,
  onDelete,
}: SupplierColumnsProps): ColumnDef<Supplier>[] {
  return [
    {
      accessorKey: "companyName",

      header: ({ column }) => (
        <SortableHeader column={column} title="Company" />
      ),

      cell: ({ row }) => (
        <span className="font-medium text-foreground">
          {row.original.companyName}
        </span>
      ),
    },

    {
      accessorKey: "contactPerson",

      header: ({ column }) => (
        <SortableHeader column={column} title="Contact Person" />
      ),

      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.contactPerson || "—"}
        </span>
      ),
    },

    {
      accessorKey: "email",

      header: ({ column }) => (
        <SortableHeader column={column} title="Email" />
      ),

      cell: ({ row }) => {
        const { email } = row.original;

        if (!email) {
          return <span className="text-muted-foreground">—</span>;
        }

        return (
          <a
            href={`mailto:${email}`}
            onClick={(event) => event.stopPropagation()}
            className="
              text-primary
              transition-colors
              duration-200
              hover:text-primary
              hover:underline
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
             
            "
          >
            {email}
          </a>
        );
      },
    },

    {
      accessorKey: "phone",

      header: ({ column }) => (
        <SortableHeader column={column} title="Phone" />
      ),

      cell: ({ row }) => {
        const { phone } = row.original;

        if (!phone) {
          return <span className="text-muted-foreground">—</span>;
        }

        return (
          <a
            href={`tel:${phone}`}
            onClick={(event) => event.stopPropagation()}
            className="
              tabular-nums
              text-muted-foreground
              transition-colors
              duration-200
              hover:text-primary
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
            "
          >
            {phone}
          </a>
        );
      },
    },

    {
      accessorKey: "address",

      header: ({ column }) => (
        <SortableHeader column={column} title="Address" />
      ),

      cell: ({ row }) => (
        <p
          className="max-w-xs truncate text-muted-foreground"
          title={row.original.address ?? undefined}
        >
          {row.original.address || "—"}
        </p>
      ),
    },

    {
      accessorKey: "createdAt",

      header: ({ column }) => (
        <SortableHeader column={column} title="Created" />
      ),

      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {formatDate(row.original.createdAt)}
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
          <SupplierActions
            supplier={row.original}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ),
    },
  ];
}
