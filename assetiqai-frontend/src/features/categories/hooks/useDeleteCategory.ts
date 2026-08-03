import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoryApi } from "../api";
import { categoryKeys } from "../constants";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryApi.deleteCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });
    },
  });
}