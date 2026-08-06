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


export interface StockFormValues {
  productId: string;
  quantity: number;
  remarks?: string;
}

interface UseStockFormProps {
  action: StockAction;

  productId?: string;

  resetKey?: string | number;

  getAvailableStock?: StockLookup;
}


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


    resolver: zodResolver(schema) as Resolver<StockFormValues>,
    defaultValues: {
      productId: productId ?? "",
      quantity: isAdjust ? 0 : 1,
      remarks: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });


  useEffect(() => {
    form.reset({
      productId: productId ?? "",
      quantity: isAdjust ? 0 : 1,
      remarks: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, productId, resetKey]);


  const watchedProductId = form.watch("productId");

  useEffect(() => {
    if (!watchedProductId) return;
    void form.trigger("quantity");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedProductId]);

  return form;
}
