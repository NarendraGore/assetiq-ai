"use client";

import { useMemo } from "react";

import { useCategories } from "@/features/categories/hooks/useCategories";
import { useSuppliers } from "@/features/suppliers/hooks/useSuppliers";

export interface LookupOption {
  id: string;
  name: string;
}

/**
 * Loads the full category and supplier lists used to populate the product
 * form selects and the list-page filter dropdowns.
 *
 * A large page size is requested so every option is available in a single
 * dropdown without its own pagination — these reference lists are small.
 */
export function useProductLookups() {
  const categoriesQuery = useCategories({ page: 1, pageSize: 100 });
  const suppliersQuery = useSuppliers({ page: 1, pageSize: 100 });

  const categoryOptions = useMemo<LookupOption[]>(
    () =>
      (categoriesQuery.data?.items ?? []).map((category) => ({
        id: category.id,
        name: category.name,
      })),
    [categoriesQuery.data]
  );

  const supplierOptions = useMemo<LookupOption[]>(
    () =>
      (suppliersQuery.data?.items ?? []).map((supplier) => ({
        id: supplier.id,
        name: supplier.companyName,
      })),
    [suppliersQuery.data]
  );

  return {
    categoryOptions,
    supplierOptions,

    isLoadingCategories: categoriesQuery.isLoading,
    isLoadingSuppliers: suppliersQuery.isLoading,

    isLoading: categoriesQuery.isLoading || suppliersQuery.isLoading,
  };
}
