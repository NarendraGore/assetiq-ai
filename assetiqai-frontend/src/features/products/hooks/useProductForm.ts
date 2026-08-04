"use client";

import { useEffect, useRef } from "react";
import {
  useForm,
  UseFormReturn,
  type Resolver,
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
    // `z.coerce.number()` widens the schema's *input* type to `unknown` under
    // Zod v4, which no longer matches `ProductFormValues`. The cast realigns
    // the resolver with the form's value shape; validation is unaffected.
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,

    defaultValues: productDefaultValues,

    mode: "onTouched",
    reValidateMode: "onChange",
  });

  /**
   * Prevent unnecessary resets: reset when the product being edited changes, or
   * when its category/supplier ids arrive (the detail response can land after
   * the first render, so keying on id alone would leave the selects empty).
   */
  const previousKey = useRef<string | null>(null);

  useEffect(() => {
    if (mode === "create") {
      if (previousKey.current !== null) {
        previousKey.current = null;
        form.reset(productDefaultValues);
      }

      return;
    }

    const currentId = defaultValues?.id ?? null;

    if (!currentId) {
      return;
    }

    const currentKey = `${currentId}|${defaultValues?.categoryId ?? ""}|${
      defaultValues?.supplierId ?? ""
    }`;

    if (currentKey === previousKey.current) {
      return;
    }

    previousKey.current = currentKey;

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
