"use client";

import { useCallback } from "react";
import { toast } from "sonner";

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
      } catch {
        toast.error("Failed to create supplier.");
        throw new Error();
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
      } catch {
        toast.error("Failed to update supplier.");
        throw new Error();
      }
    },
    [updateMutation]
  );

  const deleteSupplier = useCallback(
    async (id: string) => {
      try {
        await deleteMutation.mutateAsync(id);

        toast.success("Supplier deleted successfully.");
      } catch {
        toast.error("Failed to delete supplier.");
        throw new Error();
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
