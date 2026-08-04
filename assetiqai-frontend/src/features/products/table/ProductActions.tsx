"use client";

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { ProductListItem } from "../types";

interface ProductActionsProps {
  product: ProductListItem;
  onView: (product: ProductListItem) => void;
  onEdit: (product: ProductListItem) => void;
  onDelete: (product: ProductListItem) => void;
}

export function ProductActions({
  product,
  onView,
  onEdit,
  onDelete,
}: ProductActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Actions for ${product.name}`}
          onClick={(event) => event.stopPropagation()}
          className="
            h-8
            w-8
            rounded-lg
            transition-colors
            duration-200
            hover:bg-muted
            focus-visible:ring-2
            focus-visible:ring-ring
          "
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onView(product);
          }}
          className="cursor-pointer"
        >
          <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
          View
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onEdit(product);
          }}
          className="cursor-pointer"
        >
          <Pencil className="mr-2 h-4 w-4 text-primary" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={(event) => {
            event.stopPropagation();
            onDelete(product);
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

export default ProductActions;
