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

/**
 * Ensures the option identified by `id`/`name` is present in `options`.
 *
 * The lookup lists are paginated (first 100) and only return currently
 * selectable entities, so a product's saved category/supplier can legitimately
 * be missing from them (paged out, or since deactivated). Without this, the
 * edit form's select would render as an empty placeholder even though the
 * product clearly has a category/supplier — which reads as "not fetched".
 */
function withSelected(
  options: LookupOption[],
  id?: string | null,
  name?: string | null
): LookupOption[] {
  if (!id) return options;

  if (options.some((option) => option.id === id)) return options;

  return [{ id, name: name?.trim() || "Current selection" }, ...options];
}

/**
 * Resolves the option id for a saved relation. The detail endpoint may return
 * only the name (no id), so when the id is missing we recover it by matching
 * the name against the loaded lookup list. This is what lets the select seed
 * correctly regardless of which fields the backend populated.
 */
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

  /**
   * Reconcile the saved relation ids against the loaded lookups so the selects
   * seed even when the detail endpoint returned a name without an id (or an id
   * without a name). Falls back to whatever the backend provided.
   */
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
