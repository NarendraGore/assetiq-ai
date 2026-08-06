"use client";

import { useMemo } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { InventoryItem } from "../types";
import type { StockAction } from "../hooks/useStockDialogs";
import type { StockFormValues } from "../hooks/useStockForm";
import type { ProductOption } from "../hooks/useProductOptions";

import StockTransactionForm from "../form/StockTransactionForm";

interface StockTransactionDialogProps {
  open: boolean;
  action: StockAction;


  item?: InventoryItem | null;

  loading?: boolean;


  isProductInactive?: (productId: string) => boolean;

  onOpenChange: (open: boolean) => void;
  onSubmit: (values: StockFormValues) => Promise<void> | void;
}

const DIALOG_COPY: Record<StockAction, { title: string; description: string }> =
  {
    in: {
      title: "Stock In",
      description: "Add received or returned units to a product's stock.",
    },
    out: {
      title: "Stock Out",
      description: "Remove sold, damaged or transferred units from stock.",
    },
    adjust: {
      title: "Adjust Stock",
      description:
        "Apply a signed correction to reconcile stock with a physical count.",
    },
  };

export default function StockTransactionDialog({
  open,
  action,
  item = null,
  loading = false,
  isProductInactive,
  onOpenChange,
  onSubmit,
}: StockTransactionDialogProps) {
  const copy = DIALOG_COPY[action];

  const lockedProduct = useMemo<ProductOption | null>(
    () =>
      item
        ? {
            productId: item.productId,
            productName: item.productName,
            sku: item.sku,
            currentStock: item.currentStock,
          }
        : null,
    [item],
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!loading) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <DialogContent
        className="sm:max-w-lg"
        onPointerDownOutside={(event) => {
          if (loading) event.preventDefault();
        }}
        onEscapeKeyDown={(event) => {
          if (loading) event.preventDefault();
        }}
      >
        <DialogHeader className="space-y-2">
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>

        <StockTransactionForm
          action={action}
          lockedProduct={lockedProduct}
          resetKey={open ? `${action}-${item?.productId ?? "none"}` : "closed"}
          loading={loading}
          isProductInactive={isProductInactive}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
