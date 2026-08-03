"use client";

import { useEffect, useRef } from "react";
import {
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  categorySchema,
  CategoryFormValues,
} from "../validation";

import { Category } from "../types";

export type CategoryFormMode = "create" | "edit";

interface UseCategoryFormProps {
  mode?: CategoryFormMode;
  defaultValues?: Partial<Category> | null;
}

const EMPTY_VALUES: CategoryFormValues = {
  name: "",
  description: "",
};

export function useCategoryForm({
  mode = "create",
  defaultValues,
}: UseCategoryFormProps = {}): UseFormReturn<CategoryFormValues> {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),

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
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
    });
  }, [mode, defaultValues, form]);

  return form;
}