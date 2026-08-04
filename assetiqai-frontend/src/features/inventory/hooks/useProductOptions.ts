"use client";

import { useMemo } from "react";

import { useInventory } from "./useInventory";

export interface ProductOption {
  productId: string;
  productName: string;
  sku: string;
  currentStock: number;
}

/**
 * Flat product list for the stock-transaction form's product picker.
 *
 * Reuses the inventory list (which already carries product id, name, sku and
 * current stock) rather than adding a separate lookup call. A large page size
 * is requested so the picker holds every product without its own paging.
 */
export function useProductOptions() {
  const { data, isLoading } = useInventory({ Page: 1, PageSize: 200 });

  const options = useMemo<ProductOption[]>(
    () =>
      (data?.items ?? []).map((item) => ({
        productId: item.productId,
        productName: item.productName,
        sku: item.sku,
        currentStock: item.currentStock,
      })),
    [data],
  );

  return { options, isLoading };
}
