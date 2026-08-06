"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { getErrorMessage } from "@/lib/getErrorMessage";

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
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to create category."));
        throw error;
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
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to update category."));
        throw error;
      }
    },
    [updateMutation]
  );

  const deleteCategory = useCallback(
    async (id: string) => {
      try {
        await deleteMutation.mutateAsync(id);

        toast.success("Category deleted successfully.");
      } catch (error) {


        const fallback =
          error instanceof AxiosError && error.response?.status === 409
            ? "This category is in use by one or more products and cannot be deleted."
            : "Failed to delete category.";

        toast.error(getErrorMessage(error, fallback));
        throw error;
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