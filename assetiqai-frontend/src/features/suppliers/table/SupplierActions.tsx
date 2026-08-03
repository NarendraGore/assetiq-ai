"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Supplier } from "../types";

interface SupplierActionsProps {
  supplier: Supplier;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

export function SupplierActions({
  supplier,
  onEdit,
  onDelete,
}: SupplierActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Actions for ${supplier.companyName}`}
          onClick={(event) => event.stopPropagation()}
          className="
            h-8
            w-8
            rounded-lg
            transition-colors
            duration-200
            hover:bg-muted
            focus-visible:ring-2
            focus-visible:ring-blue-500
          "
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onEdit(supplier);
          }}
          className="cursor-pointer"
        >
          <Pencil className="mr-2 h-4 w-4 text-blue-600" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onDelete(supplier);
          }}
          className="
            cursor-pointer
            text-destructive
            focus:text-destructive
          "
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SupplierActions;
