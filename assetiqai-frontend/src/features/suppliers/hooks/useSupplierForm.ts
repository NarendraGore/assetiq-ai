"use client";

import { useEffect, useRef } from "react";
import {
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  supplierSchema,
  SupplierFormValues,
} from "../validation";

import { Supplier } from "../types";

export type SupplierFormMode = "create" | "edit";

interface UseSupplierFormProps {
  mode?: SupplierFormMode;
  defaultValues?: Partial<Supplier> | null;
}

const EMPTY_VALUES: SupplierFormValues = {
  companyName: "",
  contactPerson: "",
  email: "",
  phone: "",
  address: "",
};

export function useSupplierForm({
  mode = "create",
  defaultValues,
}: UseSupplierFormProps = {}): UseFormReturn<SupplierFormValues> {
  const form = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),

    defaultValues: EMPTY_VALUES,

    mode: "onTouched",
    reValidateMode: "onChange",
  });

  /**
   * Prevent unnecessary resets.
   */
  const previousId = useRef<string | null>(null);

  useEffect(() => {
    if (mode === "create") {
      if (previousId.current !== null) {
        previousId.current = null;
        form.reset(EMPTY_VALUES);
      }

      return;
    }

    const currentId = defaultValues?.id ?? null;

    if (currentId === previousId.current) {
      return;
    }

    previousId.current = currentId;

    form.reset({
      companyName: defaultValues?.companyName ?? "",
      contactPerson: defaultValues?.contactPerson ?? "",
      email: defaultValues?.email ?? "",
      phone: defaultValues?.phone ?? "",
      address: defaultValues?.address ?? "",
    });
  }, [mode, defaultValues, form]);

  return form;
}
