import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import supplierService from "@/services/supplier.service";

import { QUERY_KEYS } from "@/constants/query-keys";

import { toast } from "sonner";

export function useDeleteSupplier() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      supplierService.deleteSupplier,

    onSuccess: () => {
      toast.success(
        "Supplier deleted successfully"
      );

      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS.suppliers,
      });
    },

    onError: () => {
      toast.error(
        "Failed to delete supplier"
      );
    },
  });
}