import { useQuery } from "@tanstack/react-query";

import { categoryApi } from "../api";
import { categoryKeys } from "../constants";

export function useCategory(id: string) {
  return useQuery({
    queryKey: categoryKeys.detail(id),

    queryFn: () => categoryApi.getCategory(id),

    enabled: !!id,
  });
}