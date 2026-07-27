import { useQuery } from "@tanstack/react-query";

import supplierService from "@/services/supplier.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useSuppliers(
  page: number,
  pageSize: number,
  search: string
) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.suppliers,
      page,
      pageSize,
      search,
    ],

    queryFn: () =>
      supplierService.getSuppliers(
        page,
        pageSize,
        search
      ),
  });
}