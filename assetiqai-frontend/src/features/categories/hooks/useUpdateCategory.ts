import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoryApi } from "../api";
import { categoryKeys } from "../constants";
import { UpdateCategoryRequest } from "../types";

interface UpdateCategoryPayload {
  id: string;
  data: UpdateCategoryRequest;
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateCategoryPayload) =>
      categoryApi.updateCategory(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(variables.id),
      });
    },
  });
}