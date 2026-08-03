"use client";

import { Category } from "../types";
import { CategoryFormValues } from "../validation";

import { useCategoryForm } from "../hooks/useCategoryForm";

import { CategoryFormFields } from "./CategoryFormFields";
import { CategoryFormFooter } from "./CategoryFormFooter";

interface CategoryFormProps {
  mode?: "create" | "edit";

  defaultValues?: Partial<Category>;

  loading?: boolean;

  onSubmit: (values: CategoryFormValues) => void | Promise<void>;

  onCancel: () => void;
}

export function CategoryForm({
  mode = "create",
  defaultValues,
  loading = false,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const form = useCategoryForm({
    mode,
    defaultValues,
  });

  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <CategoryFormFields form={form} />

      <CategoryFormFooter
        mode={mode}
        loading={loading}
        disabled={loading || !form.formState.isDirty || !form.formState.isValid}
        onCancel={onCancel}
      />
    </form>
  );
}

export default CategoryForm;
