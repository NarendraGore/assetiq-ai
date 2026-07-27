import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import productService from "@/services/product.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export function useUpdateProduct() {
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
      productService.updateProduct(
        id,
        data
      ),

    onSuccess: () => {
      toast.success(
        "Product updated successfully."
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.products,
      });
    },

    onError: () => {
      toast.error(
        "Failed to update product."
      );
    },
  });
}