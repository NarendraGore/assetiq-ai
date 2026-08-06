"use client";

import { useQuery } from "@tanstack/react-query";

import { inventoryApi } from "../api";
import { inventoryKeys } from "../constants";

/**
 * Products currently at or below their minimum stock threshold.
 * Backs the low-stock banner/badge on the inventory page.
 */
export function useLowStock() {
  return useQuery({
    queryKey: inventoryKeys.lowStock(),
    queryFn: () => inventoryApi.getLowStock(),
    staleTime: 1000 * 60 * 2,
  });
}
