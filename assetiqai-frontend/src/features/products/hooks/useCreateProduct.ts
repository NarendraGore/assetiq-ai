import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productApi } from "../api";
import { productKeys } from "../constants";

import { categoryKeys } from "@/features/categories/constants";
import { supplierKeys } from "@/features/suppliers/constants";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });
      queryClient.invalidateQueries({
        queryKey: supplierKeys.all,
      });
    },
  });
}
