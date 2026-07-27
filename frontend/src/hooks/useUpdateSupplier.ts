import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import supplierService from "@/services/supplier.service";

import { QUERY_KEYS } from "@/constants/query-keys";

import { toast } from "sonner";

export function useUpdateSupplier() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) =>
      supplierService.updateSupplier(
        id,
        data
      ),

    onSuccess: () => {
      toast.success(
        "Supplier updated successfully"
      );

      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS.suppliers,
      });
    },

    onError: () => {
      toast.error(
        "Failed to update supplier"
      );
    },
  });
}