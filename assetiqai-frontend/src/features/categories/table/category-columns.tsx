"use client";

import { Column, ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Category } from "../types";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryColumnsProps {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
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

export function categoryColumns({
  onEdit,
  onDelete,
}: CategoryColumnsProps): ColumnDef<Category>[] {
  return [
    {
      accessorKey: "name",

      header: ({ column }) => (
        <SortableHeader column={column} title="Category" />
      ),

      cell: ({ row }) => (
        <span className="font-medium text-foreground">{row.original.name}</span>
      ),
    },

    {
      accessorKey: "description",

      header: ({ column }) => (
        <SortableHeader column={column} title="Description" />
      ),

      cell: ({ row }) => (
        <p
          className="max-w-sm truncate text-muted-foreground"
          title={row.original.description ?? undefined}
        >
          {row.original.description || "—"}
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
      accessorKey: "updatedAt",

      header: ({ column }) => (
        <SortableHeader column={column} title="Updated" />
      ),

      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {formatDate(row.original.updatedAt)}
        </span>
      ),
    },

    {
      id: "actions",

      enableSorting: false,
      enableHiding: false,

      header: () => <div className="text-right font-semibold">Actions</div>,

      cell: ({ row }) => {
        const category = row.original;

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Actions for ${category.name}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(category);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(category);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
