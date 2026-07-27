import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import supplierService from "@/services/supplier.service";

import { QUERY_KEYS } from "@/constants/query-keys";

import { toast } from "sonner";

export function useCreateSupplier() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      supplierService.createSupplier,

    onSuccess: () => {
      toast.success(
        "Supplier created successfully"
      );

      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS.suppliers,
      });
    },

    onError: () => {
      toast.error(
        "Failed to create supplier"
      );
    },
  });
}