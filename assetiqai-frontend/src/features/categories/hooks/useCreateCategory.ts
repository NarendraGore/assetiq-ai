import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoryApi } from "../api";
import { categoryKeys } from "../constants";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryApi.createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });
    },
  });
}