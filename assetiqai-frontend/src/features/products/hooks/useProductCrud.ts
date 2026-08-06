"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { getErrorMessage } from "@/lib/getErrorMessage";

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
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to create product."));



        throw error;
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
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to update product."));
        throw error;
      }
    },
    [updateMutation]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        await deleteMutation.mutateAsync(id);

        toast.success("Product deleted successfully.");
      } catch (error) {


        const fallback =
          error instanceof AxiosError && error.response?.status === 409
            ? "This product has related records and cannot be deleted."
            : "Failed to delete product.";

        toast.error(getErrorMessage(error, fallback));
        throw error;
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
