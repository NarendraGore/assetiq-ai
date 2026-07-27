import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import productService from "@/services/product.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCreateProduct() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      productService.createProduct,

    onSuccess: () => {
      toast.success(
        "Product created successfully."
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products,
      });
    },

    onError: () => {
      toast.error(
        "Failed to create product."
      );
    },
  });
}