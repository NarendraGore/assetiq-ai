import { useQuery } from "@tanstack/react-query";

import categoryService from "@/services/category.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCategory(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.category(id),

    queryFn: () =>
      categoryService.getCategory(id),

    enabled: !!id,
  });
}