import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productApi } from "../api";
import { productKeys } from "../constants";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productApi.deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });
}
