"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { getErrorMessage } from "@/lib/getErrorMessage";

import {
  CreateSupplierRequest,
  UpdateSupplierRequest,
} from "../types";

import { useCreateSupplier } from "./useCreateSupplier";
import { useDeleteSupplier } from "./useDeleteSupplier";
import { useUpdateSupplier } from "./useUpdateSupplier";

export function useSupplierCrud() {
  const createMutation = useCreateSupplier();
  const updateMutation = useUpdateSupplier();
  const deleteMutation = useDeleteSupplier();

  const createSupplier = useCallback(
    async (values: CreateSupplierRequest) => {
      try {
        await createMutation.mutateAsync(values);

        toast.success("Supplier created successfully.");
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to create supplier."));
        throw error;
      }
    },
    [createMutation]
  );

  const updateSupplier = useCallback(
    async (
      id: string,
      values: UpdateSupplierRequest
    ) => {
      try {
        await updateMutation.mutateAsync({
          id,
          data: values,
        });

        toast.success("Supplier updated successfully.");
      } catch (error) {
        toast.error(getErrorMessage(error, "Failed to update supplier."));
        throw error;
      }
    },
    [updateMutation]
  );

  const deleteSupplier = useCallback(
    async (id: string) => {
      try {
        await deleteMutation.mutateAsync(id);

        toast.success("Supplier deleted successfully.");
      } catch (error) {
        const fallback =
          error instanceof AxiosError && error.response?.status === 409
            ? "This supplier is in use by one or more products and cannot be deleted."
            : "Failed to delete supplier.";

        toast.error(getErrorMessage(error, fallback));
        throw error;
      }
    },
    [deleteMutation]
  );

  return {
    createSupplier,
    updateSupplier,
    deleteSupplier,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
