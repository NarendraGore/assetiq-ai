import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productApi } from "../api";
import { productKeys } from "../constants";
import { UpdateProductRequest } from "../types";

interface UpdateProductPayload {
  id: string;
  data: UpdateProductRequest;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateProductPayload) =>
      productApi.updateProduct(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.id),
      });
    },
  });
}
