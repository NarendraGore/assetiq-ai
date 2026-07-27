import { useQuery } from "@tanstack/react-query";

import productService from "@/services/product.service";

import { QUERY_KEYS } from "@/constants/query-keys";

interface UseProductsParams {
  page: number;
  pageSize: number;
  search: string;
  categoryId?: string;
  supplierId?: string;
  minPrice?: number;
  maxPrice?: number;
}

export function useProducts({
  page,
  pageSize,
  search,
  categoryId = "",
  supplierId = "",
  minPrice,
  maxPrice,
}: UseProductsParams) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.products,
      page,
      pageSize,
      search,
      categoryId,
      supplierId,
      minPrice,
      maxPrice,
    ],

    queryFn: () =>
      productService.getProducts(
        page,
        pageSize,
        search,
        categoryId,
        supplierId,
        minPrice,
        maxPrice
      ),
  });
}