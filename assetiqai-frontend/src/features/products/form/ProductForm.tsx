"use client";

import { useMemo } from "react";

import { Product } from "../types";
import { ProductFormValues } from "../validation";

import { useProductForm } from "../hooks/useProductForm";
import { useProductLookups, type LookupOption } from "../hooks/useProductLookups";

import { ProductFormFields } from "./ProductFormFields";
import { ProductFormFooter } from "./ProductFormFooter";

interface ProductFormProps {
  mode?: "create" | "edit";

  defaultValues?: Partial<Product> | null;

  loading?: boolean;

  onSubmit: (values: ProductFormValues) => void | Promise<void>;

  onCancel: () => void;
}


function withSelected(
  options: LookupOption[],
  id?: string | null,
  name?: string | null
): LookupOption[] {
  if (!id) return options;

  if (options.some((option) => option.id === id)) return options;

  return [{ id, name: name?.trim() || "Current selection" }, ...options];
}


function resolveId(
  options: LookupOption[],
  id?: string | null,
  name?: string | null
): string {
  if (id) return id;

  const trimmed = name?.trim().toLowerCase();

  if (!trimmed) return "";

  return (
    options.find((option) => option.name.trim().toLowerCase() === trimmed)
      ?.id ?? ""
  );
}

export function ProductForm({
  mode = "create",
  defaultValues,
  loading = false,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const {
    categoryOptions,
    supplierOptions,
    isLoading: isLoadingLookups,
  } = useProductLookups();


  const effectiveDefaults = useMemo<Partial<Product> | null | undefined>(() => {
    if (!defaultValues) return defaultValues;

    return {
      ...defaultValues,
      categoryId: resolveId(
        categoryOptions,
        defaultValues.categoryId,
        defaultValues.categoryName
      ),
      supplierId: resolveId(
        supplierOptions,
        defaultValues.supplierId,
        defaultValues.supplierName
      ),
    };
  }, [defaultValues, categoryOptions, supplierOptions]);

  const form = useProductForm({
    mode,
    defaultValues: effectiveDefaults,
  });

  const mergedCategoryOptions = useMemo(
    () =>
      withSelected(
        categoryOptions,
        effectiveDefaults?.categoryId,
        effectiveDefaults?.categoryName
      ),
    [
      categoryOptions,
      effectiveDefaults?.categoryId,
      effectiveDefaults?.categoryName,
    ]
  );

  const mergedSupplierOptions = useMemo(
    () =>
      withSelected(
        supplierOptions,
        effectiveDefaults?.supplierId,
        effectiveDefaults?.supplierName
      ),
    [
      supplierOptions,
      effectiveDefaults?.supplierId,
      effectiveDefaults?.supplierName,
    ]
  );

  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <ProductFormFields
        form={form}
        categoryOptions={mergedCategoryOptions}
        supplierOptions={mergedSupplierOptions}
        isLoadingLookups={isLoadingLookups}
      />

      <ProductFormFooter
        mode={mode}
        loading={loading}
        disabled={loading || !form.formState.isValid}
        onCancel={onCancel}
      />
    </form>
  );
}

export default ProductForm;
