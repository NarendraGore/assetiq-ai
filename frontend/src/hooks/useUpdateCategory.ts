import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import categoryService from "@/services/category.service";

import { QUERY_KEYS } from "@/constants/query-keys";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name: string;
        description: string;
      };
    }) =>
      categoryService.updateCategory(
        id,
        data
      ),

    onSuccess: () => {
      toast.success(
        "Category updated successfully."
      );

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.categories,
      });
    },

    onError: () => {
      toast.error(
        "Failed to update category."
      );
    },
  });
}