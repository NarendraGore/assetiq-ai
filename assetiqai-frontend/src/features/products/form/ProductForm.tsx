"use client";

import { Product } from "../types";
import { ProductFormValues } from "../validation";

import { useProductForm } from "../hooks/useProductForm";
import { useProductLookups } from "../hooks/useProductLookups";

import { ProductFormFields } from "./ProductFormFields";
import { ProductFormFooter } from "./ProductFormFooter";

interface ProductFormProps {
  mode?: "create" | "edit";

  defaultValues?: Partial<Product> | null;

  loading?: boolean;

  onSubmit: (values: ProductFormValues) => void | Promise<void>;

  onCancel: () => void;
}

export function ProductForm({
  mode = "create",
  defaultValues,
  loading = false,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const form = useProductForm({
    mode,
    defaultValues,
  });

  const {
    categoryOptions,
    supplierOptions,
    isLoading: isLoadingLookups,
  } = useProductLookups();

  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <ProductFormFields
        form={form}
        categoryOptions={categoryOptions}
        supplierOptions={supplierOptions}
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
