"use client";

import { useCallback } from "react";
import { toast } from "sonner";

import {
  CreateProductRequest,
  UpdateProductRequest,
} from "../types";

import { useCreateProduct } from "./useCreateProduct";
import { useDeleteProduct } from "./useDeleteProduct";
import { useUpdateProduct } from "./useUpdateProduct";

export function useProductCrud() {
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const createProduct = useCallback(
    async (values: CreateProductRequest) => {
      try {
        await createMutation.mutateAsync(values);

        toast.success("Product created successfully.");
      } catch {
        toast.error("Failed to create product.");
        throw new Error();
      }
    },
    [createMutation]
  );

  const updateProduct = useCallback(
    async (
      id: string,
      values: UpdateProductRequest
    ) => {
      try {
        await updateMutation.mutateAsync({
          id,
          data: values,
        });

        toast.success("Product updated successfully.");
      } catch {
        toast.error("Failed to update product.");
        throw new Error();
      }
    },
    [updateMutation]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        await deleteMutation.mutateAsync(id);

        toast.success("Product deleted successfully.");
      } catch {
        toast.error("Failed to delete product.");
        throw new Error();
      }
    },
    [deleteMutation]
  );

  return {
    createProduct,
    updateProduct,
    deleteProduct,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
