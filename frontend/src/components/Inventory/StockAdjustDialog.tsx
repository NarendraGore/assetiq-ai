"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import StockTransactionForm, {
  StockTransactionFormValues,
} from "./StockTransactionForm";

interface Props {
  open: boolean;

  loading?: boolean;

  onOpenChange: (
    open: boolean
  ) => void;

  onSubmit?: (data: StockTransactionFormValues) => void;
}

export default function StockAdjustDialog({
  open,
  loading,
  onOpenChange,
  onSubmit,
}: Props) {
  const handleSubmit = (data: StockTransactionFormValues) => {
    onSubmit?.(data);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Adjust Stock
          </DialogTitle>
        </DialogHeader>

        <StockTransactionForm
          mode="adjust"
          loading={loading}
          onSubmit={handleSubmit}
          onCancel={() =>
            onOpenChange(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}