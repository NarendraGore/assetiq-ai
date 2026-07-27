import { useQuery } from "@tanstack/react-query";

import supplierService from "@/services/supplier.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useSupplier(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.supplier(id),

    queryFn: () =>
      supplierService.getSupplier(id),

    enabled: !!id,
  });
}