"use client";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { InventoryItem } from "../types";

interface InventoryActionsProps {
  item: InventoryItem;
  onStockIn: (item: InventoryItem) => void;
  onStockOut: (item: InventoryItem) => void;

  disabled?: boolean;
}

export default function InventoryActions({
  item,
  onStockIn,
  onStockOut,
  disabled = false,
}: InventoryActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Stock actions for ${item.productName}`}
          onClick={(event) => event.stopPropagation()}
          className="h-8 w-8 rounded-lg transition-colors duration-200 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-52">
        {disabled && (
          <>
            <div className="px-2 py-1.5 text-xs text-muted-foreground">
              Product is inactive — reactivate it to record stock movements.
            </div>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation();
            onStockIn(item);
          }}
          className="cursor-pointer"
        >
          <ArrowDownToLine className="mr-2 h-4 w-4 text-emerald-600" />
          Stock In
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={disabled}
          onClick={(event) => {
            event.stopPropagation();
            onStockOut(item);
          }}
          className="cursor-pointer"
        >
          <ArrowUpFromLine className="mr-2 h-4 w-4 text-destructive" />
          Stock Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
