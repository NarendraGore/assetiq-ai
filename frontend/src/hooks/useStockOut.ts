import { useMutation, useQueryClient } from "@tanstack/react-query";

import stockService from "@/services/stock.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useStockOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: stockService.stockOut,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.inventory,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.stockHistory,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.lowStock,
      });
    },
  });
}