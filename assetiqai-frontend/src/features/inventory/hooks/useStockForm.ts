"use client";

import { useEffect } from "react";
import { useForm, UseFormReturn, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  stockAdjustSchema,
  stockMovementSchema,
} from "../validation";

import type { StockAction } from "./useStockDialogs";

/** Shared value shape for all three stock operations. */
export interface StockFormValues {
  productId: string;
  quantity: number;
  remarks?: string;
}

interface UseStockFormProps {
  action: StockAction;
  /** Product id to pre-select when opened from a specific row. */
  productId?: string;
  /** Re-initialise the form whenever the dialog re-opens. */
  resetKey?: string | number;
}

/**
 * Builds the react-hook-form instance for the stock-transaction dialog. The
 * resolver switches on the action: Stock In/Out require a positive whole
 * quantity, while Adjustment accepts a signed, non-zero delta.
 */
export function useStockForm({
  action,
  productId,
  resetKey,
}: UseStockFormProps): UseFormReturn<StockFormValues> {
  const isAdjust = action === "adjust";

  const form = useForm<StockFormValues>({
    // z.coerce.number() gives an `unknown` input type under Zod v4, so the
    // resolver is cast to the form's value shape (validation still runs).
    resolver: zodResolver(
      isAdjust ? stockAdjustSchema : stockMovementSchema,
    ) as Resolver<StockFormValues>,
    defaultValues: {
      productId: productId ?? "",
      quantity: isAdjust ? 0 : 1,
      remarks: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  /* Re-seed the form each time it's opened for a (possibly) new action/product. */
  useEffect(() => {
    form.reset({
      productId: productId ?? "",
      quantity: isAdjust ? 0 : 1,
      remarks: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, productId, resetKey]);

  return form;
}
