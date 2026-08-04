"use client";

import { useCallback } from "react";
import { toast } from "sonner";

import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "../types";

import { useCreateCategory } from "./useCreateCategory";
import { useDeleteCategory } from "./useDeleteCategory";
import { useUpdateCategory } from "./useUpdateCategory";

export function useCategoryCrud() {
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const createCategory = useCallback(
    async (values: CreateCategoryRequest) => {
      try {
        await createMutation.mutateAsync(values);

        toast.success("Category created successfully.");
      } catch {
        toast.error("Failed to create category.");
        throw new Error();
      }
    },
    [createMutation]
  );

  const updateCategory = useCallback(
    async (
      id: string,
      values: UpdateCategoryRequest
    ) => {
      try {
        await updateMutation.mutateAsync({
          id,
          data: values,
        });

        toast.success("Category updated successfully.");
      } catch {
        toast.error("Failed to update category.");
        throw new Error();
      }
    },
    [updateMutation]
  );

  const deleteCategory = useCallback(
    async (id: string) => {
      try {
        await deleteMutation.mutateAsync(id);

        toast.success("Category deleted successfully.");
      } catch {
        toast.error("Failed to delete category.");
        throw new Error();
      }
    },
    [deleteMutation]
  );

  return {
    createCategory,
    updateCategory,
    deleteCategory,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}