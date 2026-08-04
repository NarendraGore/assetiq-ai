import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supplierApi } from "../api";
import { supplierKeys } from "../constants";

export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supplierApi.createSupplier,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: supplierKeys.all,
      });
    },
  });
}
