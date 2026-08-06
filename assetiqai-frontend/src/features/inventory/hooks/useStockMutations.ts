"use client";

import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { inventoryApi } from "../api";
import { inventoryKeys } from "../constants";
import { getErrorMessage } from "@/lib/getErrorMessage";

import type {
  StockAdjustRequest,
  StockInRequest,
  StockOutRequest,
} from "../types";


export function useStockMutations() {
  const queryClient = useQueryClient();

  const invalidate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: inventoryKeys.all });
  }, [queryClient]);

  const stockInMutation = useMutation({
    mutationFn: inventoryApi.stockIn,
    onSuccess: invalidate,
  });

  const stockOutMutation = useMutation({
    mutationFn: inventoryApi.stockOut,
    onSuccess: invalidate,
  });

  const adjustMutation = useMutation({
    mutationFn: inventoryApi.adjustStock,
    onSuccess: invalidate,
  });

  const stockIn = useCallback(
    async (payload: StockInRequest) => {
      try {
        const res = await stockInMutation.mutateAsync(payload);
        toast.success(res?.message ?? "Stock added successfully.");
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to add stock."));
        throw error;
      }
    },
    [stockInMutation],
  );

  const stockOut = useCallback(
    async (payload: StockOutRequest) => {
      try {
        const res = await stockOutMutation.mutateAsync(payload);
        toast.success(res?.message ?? "Stock removed successfully.");
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to remove stock."));
        throw error;
      }
    },
    [stockOutMutation],
  );

  const adjustStock = useCallback(
    async (payload: StockAdjustRequest) => {
      try {
        const res = await adjustMutation.mutateAsync(payload);
        toast.success(res?.message ?? "Stock adjusted successfully.");
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to adjust stock."));
        throw error;
      }
    },
    [adjustMutation],
  );

  return {
    stockIn,
    stockOut,
    adjustStock,

    isStockingIn: stockInMutation.isPending,
    isStockingOut: stockOutMutation.isPending,
    isAdjusting: adjustMutation.isPending,
  };
}
