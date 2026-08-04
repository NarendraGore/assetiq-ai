"use client";

import { useCallback, useMemo } from "react";

import { useProducts } from "@/features/products/hooks/useProducts";

/**
 * Cross-references product active status for the inventory flow.
 *
 * The inventory endpoints (`/v1/stock/*`) don't carry an `isActive` flag, but
 * an inactive product must not accept Stock In / Out / Adjustment. Products are
 * the source of truth for active status, so we pull the products list once and
 * expose a fast lookup. A large page size mirrors the picker's own 200-row
 * fetch so the two visible sets line up.
 */
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

  /**
   * True only when the product is *known* to be inactive. Products missing
   * from the list (unknown status) are treated as active so the backend stays
   * the final authority and we never block a legitimate transaction.
   */
  const isProductInactive = useCallback(
    (productId?: string | null) =>
      !!productId && inactiveIds.has(productId),
    [inactiveIds],
  );

  return { inactiveIds, isProductInactive, isLoading };
}
