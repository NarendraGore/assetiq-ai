"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface InventoryHeaderProps {
  title?: string;
  description?: string;
  onStockIn?: () => void;
  onStockOut?: () => void;
  onAdjust?: () => void;
}

export default function InventoryHeader({
  title = "Inventory",
  description = "Manage inventory and stock transactions.",
  onStockIn,
  onStockOut,
  onAdjust,
}: InventoryHeaderProps) {
  const showActions = Boolean(onStockIn || onStockOut || onAdjust);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>

        <p className="text-muted-foreground">{description}</p>
      </div>

      {showActions && (
        <div className="flex gap-2">
          {onStockIn && (
            <Button onClick={onStockIn}>
              <Plus className="mr-2 h-4 w-4" />
              Stock In
            </Button>
          )}

          {onStockOut && (
            <Button variant="secondary" onClick={onStockOut}>
              Stock Out
            </Button>
          )}

          {onAdjust && (
            <Button variant="outline" onClick={onAdjust}>
              Adjust Stock
            </Button>
          )}
        </div>
      )}
    </div>
  );
}