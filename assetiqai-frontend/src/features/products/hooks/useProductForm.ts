"use client";

import { useEffect, useRef } from "react";
import {
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  productSchema,
  ProductFormValues,
  productDefaultValues,
} from "../validation";

import { Product } from "../types";

export type ProductFormMode = "create" | "edit";

interface UseProductFormProps {
  mode?: ProductFormMode;
  defaultValues?: Partial<Product> | null;
}

export function useProductForm({
  mode = "create",
  defaultValues,
}: UseProductFormProps = {}): UseFormReturn<ProductFormValues> {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),

    defaultValues: productDefaultValues,

    mode: "onTouched",
    reValidateMode: "onChange",
  });

  /**
   * Prevent unnecessary resets: only reset when the underlying product id
   * changes (e.g. switching which product is being edited).
   */
  const previousId = useRef<string | null>(null);

  useEffect(() => {
    if (mode === "create") {
      if (previousId.current !== null) {
        previousId.current = null;
        form.reset(productDefaultValues);
      }

      return;
    }

    const currentId = defaultValues?.id ?? null;

    if (currentId === previousId.current) {
      return;
    }

    previousId.current = currentId;

    form.reset({
      name: defaultValues?.name ?? "",
      sku: defaultValues?.sku ?? "",
      description: defaultValues?.description ?? "",
      categoryId: defaultValues?.categoryId ?? "",
      supplierId: defaultValues?.supplierId ?? "",
      unitPrice: defaultValues?.unitPrice ?? 0,
      stockQuantity: defaultValues?.stockQuantity ?? 0,
      minimumStock: defaultValues?.minimumStock ?? 0,
      isActive: defaultValues?.isActive ?? true,
    });
  }, [mode, defaultValues, form]);

  return form;
}
