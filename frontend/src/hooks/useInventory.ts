import { useQuery } from "@tanstack/react-query";
import stockService from "@/services/stock.service";
import { QUERY_KEYS } from "@/constants/query-keys";

interface UseInventoryParams {
  page: number;
  pageSize: number;
  search: string;
}

export function useInventory({
  page,
  pageSize,
  search,
}: UseInventoryParams) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.inventory,
      page,
      pageSize,
      search,
    ],

    queryFn: () =>
      stockService.getInventory(
        page,
        pageSize,
        search
      ),
  });
}