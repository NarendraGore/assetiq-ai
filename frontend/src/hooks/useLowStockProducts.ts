import { useQuery } from "@tanstack/react-query";

import productService from "@/services/product.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useLowStockProducts() {
  return useQuery({
    queryKey:
      QUERY_KEYS.lowStockProducts,

    queryFn:
      productService.getLowStockProducts,
  });
}