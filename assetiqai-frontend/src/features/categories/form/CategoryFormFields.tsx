"use client";

import { Controller, UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { CategoryFormValues } from "../validation";

interface CategoryFormFieldsProps {
  form: UseFormReturn<CategoryFormValues>;
}

export function CategoryFormFields({ form }: CategoryFormFieldsProps) {
  return (
    <div className="space-y-6">
      {/* Category Name */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Category Name
          <span className="ml-1 text-destructive">*</span>
        </Label>

        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <>
              <Input
                id="name"
                {...field}
                placeholder="Enter category name"
                autoComplete="off"
                maxLength={100}
                aria-invalid={!!fieldState.error}
              />

              {fieldState.error && (
                <p className="text-sm text-destructive">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Controller
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <>
              <Textarea
                id="description"
                {...field}
                value={field.value ?? ""}
                rows={5}
                maxLength={500}
                placeholder="Enter category description"
                className="resize-none"
                aria-invalid={!!fieldState.error}
              />

              <div className="flex items-center justify-between">
                {fieldState.error ? (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                ) : (
                  <span />
                )}

                <span className="text-xs text-muted-foreground">
                  {(field.value ?? "").length}/500
                </span>
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
}
