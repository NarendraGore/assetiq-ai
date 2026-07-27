import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import productService from "@/services/product.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useDeleteProduct() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      productService.deleteProduct,

    onSuccess: () => {
      toast.success(
        "Product deleted successfully."
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products,
      });
    },

    onError: () => {
      toast.error(
        "Failed to delete product."
      );
    },
  });
}