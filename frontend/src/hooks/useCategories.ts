import { useQuery } from "@tanstack/react-query";

import categoryService from "@/services/category.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCategories(
  page: number,
  pageSize: number,
  search = ""
) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.categories,
      page,
      pageSize,
      search,
    ],

    queryFn: () =>
      categoryService.getCategories({
        page,
        pageSize,
        search,
      }),
  });
}