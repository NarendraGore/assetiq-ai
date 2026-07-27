import { useQuery } from "@tanstack/react-query";

import stockService from "@/services/stock.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useLowStock() {
  return useQuery({
    queryKey: QUERY_KEYS.lowStock,

    queryFn: stockService.getLowStock,
  });
}