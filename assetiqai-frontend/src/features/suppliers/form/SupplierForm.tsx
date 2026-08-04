"use client";

import { Supplier } from "../types";
import { SupplierFormValues } from "../validation";

import { useSupplierForm } from "../hooks/useSupplierForm";

import { SupplierFormFields } from "./SupplierFormFields";
import { SupplierFormFooter } from "./SupplierFormFooter";

interface SupplierFormProps {
  mode?: "create" | "edit";

  defaultValues?: Partial<Supplier>;

  loading?: boolean;

  onSubmit: (values: SupplierFormValues) => void | Promise<void>;

  onCancel: () => void;
}

export function SupplierForm({
  mode = "create",
  defaultValues,
  loading = false,
  onSubmit,
  onCancel,
}: SupplierFormProps) {
  const form = useSupplierForm({
    mode,
    defaultValues,
  });

  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <SupplierFormFields form={form} />

      <SupplierFormFooter
        mode={mode}
        loading={loading}
        disabled={loading || !form.formState.isDirty || !form.formState.isValid}
        onCancel={onCancel}
      />
    </form>
  );
}

export default SupplierForm;
