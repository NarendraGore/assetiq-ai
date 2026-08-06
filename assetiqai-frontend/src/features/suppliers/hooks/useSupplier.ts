import { useQuery } from "@tanstack/react-query";

import { supplierApi } from "../api";
import { supplierKeys } from "../constants";

export function useSupplier(id: string) {
  return useQuery({
    queryKey: supplierKeys.detail(id),

    queryFn: () => supplierApi.getSupplier(id),

    enabled: !!id,
  });
}
