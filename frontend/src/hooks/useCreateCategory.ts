import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import categoryService from "@/services/category.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn:
      categoryService.createCategory,

    onSuccess: () => {
      toast.success(
        "Category created successfully."
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.categories,
      });
    },

    onError: () => {
      toast.error(
        "Failed to create category."
      );
    },
  });
}