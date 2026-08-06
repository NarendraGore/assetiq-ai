"use client";

import { useCallback, useMemo } from "react";

import { useProducts } from "@/features/products/hooks/useProducts";


export function useProductActiveStatus() {
  const { data, isLoading } = useProducts({ page: 1, pageSize: 200 });

  const inactiveIds = useMemo(() => {
    const set = new Set<string>();

    (data?.items ?? []).forEach((product) => {
      if (!product.isActive) {
        set.add(product.id);
      }
    });

    return set;
  }, [data]);


  const isProductInactive = useCallback(
    (productId?: string | null) =>
      !!productId && inactiveIds.has(productId),
    [inactiveIds],
  );

  return { inactiveIds, isProductInactive, isLoading };
}
