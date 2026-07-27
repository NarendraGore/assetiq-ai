import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import categoryService from "@/services/category.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:
      categoryService.deleteCategory,

    onSuccess: () => {
      toast.success(
        "Category deleted successfully."
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.categories,
      });
    },

    onError: () => {
      toast.error(
        "Failed to delete category."
      );
    },
  });
}