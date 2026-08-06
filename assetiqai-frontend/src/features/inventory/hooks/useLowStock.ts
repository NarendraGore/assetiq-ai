"use client";

import { useQuery } from "@tanstack/react-query";

import { inventoryApi } from "../api";
import { inventoryKeys } from "../constants";


export function useLowStock() {
  return useQuery({
    queryKey: inventoryKeys.lowStock(),
    queryFn: () => inventoryApi.getLowStock(),
    staleTime: 1000 * 60 * 2,
  });
}
