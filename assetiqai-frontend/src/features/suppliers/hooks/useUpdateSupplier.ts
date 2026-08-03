import { useMutation, useQueryClient } from "@tanstack/react-query";

import { supplierApi } from "../api";
import { supplierKeys } from "../constants";
import { UpdateSupplierRequest } from "../types";

interface UpdateSupplierPayload {
  id: string;
  data: UpdateSupplierRequest;
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateSupplierPayload) =>
      supplierApi.updateSupplier(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: supplierKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: supplierKeys.detail(variables.id),
      });
    },
  });
}
