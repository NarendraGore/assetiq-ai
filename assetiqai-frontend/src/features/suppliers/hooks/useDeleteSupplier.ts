import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supplierApi } from "../api";
import { supplierKeys } from "../constants";

export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: supplierApi.deleteSupplier,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: supplierKeys.all,
      });
    },
  });
}
