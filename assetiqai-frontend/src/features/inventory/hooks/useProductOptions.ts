"use client";

import { useMemo } from "react";

import { useInventory } from "./useInventory";

export interface ProductOption {
  productId: string;
  productName: string;
  sku: string;
  currentStock: number;
}


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
