"use client";

import { useQuery } from "@tanstack/react-query";

import { inventoryApi } from "../api";
import { inventoryKeys } from "../constants";
import type { InventoryQueryParams } from "../types";


export function useInventory(params: InventoryQueryParams = {}) {
  const { Page = 1, PageSize = 10, Search = "" } = params;

  const queryParams: InventoryQueryParams = { Page, PageSize, Search };

  return useQuery({
    queryKey: inventoryKeys.list(queryParams),
    queryFn: () => inventoryApi.getInventory(queryParams),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2,
  });
}
