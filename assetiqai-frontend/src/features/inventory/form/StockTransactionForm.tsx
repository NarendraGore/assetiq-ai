"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { StockAction } from "../hooks/useStockDialogs";
import { useStockForm, type StockFormValues } from "../hooks/useStockForm";
import { useProductOptions, type ProductOption } from "../hooks/useProductOptions";

import StockTransactionFields from "./StockTransactionFields";

interface StockTransactionFormProps {
  action: StockAction;

  /** Product the dialog was opened for, if launched from a row. */
  lockedProduct?: ProductOption | null;

  /** Bumps on each open so the form re-seeds. */
  resetKey?: string | number;

  loading?: boolean;

  onSubmit: (values: StockFormValues) => void | Promise<void>;
  onCancel: () => void;
}

const SUBMIT_LABEL: Record<StockAction, string> = {
  in: "Add stock",
  out: "Remove stock",
  adjust: "Apply adjustment",
};

export default function StockTransactionForm({
  action,
  lockedProduct = null,
  resetKey,
  loading = false,
  onSubmit,
  onCancel,
}: StockTransactionFormProps) {
  const form = useStockForm({
    action,
    productId: lockedProduct?.productId,
    resetKey,
  });

  const { options, isLoading: isLoadingOptions } = useProductOptions();

  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <StockTransactionFields
        action={action}
        form={form}
        options={options}
        isLoadingOptions={isLoadingOptions}
        lockedProduct={lockedProduct}
      />

      <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading || !form.formState.isValid}
          className="w-full bg-primary text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {SUBMIT_LABEL[action]}
        </Button>
      </div>
    </form>
  );
}
