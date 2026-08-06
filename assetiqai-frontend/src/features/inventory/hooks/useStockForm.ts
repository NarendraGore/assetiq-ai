"use client";

import { useEffect, useMemo } from "react";
import { useForm, UseFormReturn, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createStockAdjustSchema,
  createStockOutSchema,
  stockMovementSchema,
  type StockLookup,
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
  /**
   * Resolves the available stock for a product id. Used to cap Stock Out and
   * negative Adjustments so they cannot drive stock below zero. Optional — when
   * absent the amount-vs-stock rule is skipped and the server validates.
   */
  getAvailableStock?: StockLookup;
}

/**
 * Builds the react-hook-form instance for the stock-transaction dialog. The
 * resolver switches on the action: Stock In requires a positive whole quantity,
 * Stock Out additionally caps that quantity at the available stock, and
 * Adjustment accepts a signed, non-zero delta that may not drive stock below
 * zero.
 */
export function useStockForm({
  action,
  productId,
  resetKey,
  getAvailableStock,
}: UseStockFormProps): UseFormReturn<StockFormValues> {
  const isAdjust = action === "adjust";

  const schema = useMemo(() => {
    if (action === "adjust") return createStockAdjustSchema(getAvailableStock);
    if (action === "out") return createStockOutSchema(getAvailableStock);
    return stockMovementSchema;
  }, [action, getAvailableStock]);

  const form = useForm<StockFormValues>({
    // z.coerce.number() gives an `unknown` input type under Zod v4, so the
    // resolver is cast to the form's value shape (validation still runs).
    resolver: zodResolver(schema) as Resolver<StockFormValues>,
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

  /*
   * The over-stock rule depends on the selected product, so when the product
   * changes in the free-choice picker we must re-run the quantity validation
   * (react-hook-form only re-validates the field being edited). We watch the
   * product id and re-validate the quantity whenever a product is selected.
   */
  const watchedProductId = form.watch("productId");

  useEffect(() => {
    if (!watchedProductId) return;
    void form.trigger("quantity");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedProductId]);

  return form;
}
