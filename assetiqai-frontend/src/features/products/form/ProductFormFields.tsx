"use client";

import { Controller, UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ProductFormValues } from "../validation";
import type { LookupOption } from "../hooks/useProductLookups";

interface ProductFormFieldsProps {
  form: UseFormReturn<ProductFormValues>;

  categoryOptions: LookupOption[];
  supplierOptions: LookupOption[];

  isLoadingLookups?: boolean;
}

export function ProductFormFields({
  form,
  categoryOptions,
  supplierOptions,
  isLoadingLookups = false,
}: ProductFormFieldsProps) {
  return (
    <div className="space-y-6">
      {/* Name + SKU */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">
            Product Name
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
                  placeholder="Enter product name"
                  autoComplete="off"
                  maxLength={150}
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

        <div className="space-y-2">
          <Label htmlFor="sku">
            SKU
            <span className="ml-1 text-destructive">*</span>
          </Label>

          <Controller
            control={form.control}
            name="sku"
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="sku"
                  {...field}
                  placeholder="e.g. MFan-001"
                  autoComplete="off"
                  maxLength={50}
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
      </div>

      {/* Category + Supplier */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="categoryId">
            Category
            <span className="ml-1 text-destructive">*</span>
          </Label>

          <Controller
            control={form.control}
            name="categoryId"
            render={({ field, fieldState }) => (
              <>
                <Select
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                  disabled={isLoadingLookups}
                >
                  <SelectTrigger
                    id="categoryId"
                    className="w-full"
                    aria-invalid={!!fieldState.error}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.error && (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplierId">
            Supplier
            <span className="ml-1 text-destructive">*</span>
          </Label>

          <Controller
            control={form.control}
            name="supplierId"
            render={({ field, fieldState }) => (
              <>
                <Select
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                  disabled={isLoadingLookups}
                >
                  <SelectTrigger
                    id="supplierId"
                    className="w-full"
                    aria-invalid={!!fieldState.error}
                  >
                    <SelectValue placeholder="Select a supplier" />
                  </SelectTrigger>

                  <SelectContent>
                    {supplierOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.error && (
                  <p className="text-sm text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </div>

      {/* Unit price + Stock + Minimum stock */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="unitPrice">
            Unit Price
            <span className="ml-1 text-destructive">*</span>
          </Label>

          <Controller
            control={form.control}
            name="unitPrice"
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="unitPrice"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  {...field}
                  value={field.value ?? ""}
                  placeholder="0.00"
                  aria-invalid={!!fieldState.error}
                  className="tabular-nums"
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

        <div className="space-y-2">
          <Label htmlFor="stockQuantity">
            Stock Quantity
            <span className="ml-1 text-destructive">*</span>
          </Label>

          <Controller
            control={form.control}
            name="stockQuantity"
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="stockQuantity"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step="1"
                  {...field}
                  value={field.value ?? ""}
                  placeholder="0"
                  aria-invalid={!!fieldState.error}
                  className="tabular-nums"
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

        <div className="space-y-2">
          <Label htmlFor="minimumStock">
            Minimum Stock
            <span className="ml-1 text-destructive">*</span>
          </Label>

          <Controller
            control={form.control}
            name="minimumStock"
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="minimumStock"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step="1"
                  {...field}
                  value={field.value ?? ""}
                  placeholder="0"
                  aria-invalid={!!fieldState.error}
                  className="tabular-nums"
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
                rows={4}
                maxLength={500}
                placeholder="Enter product description"
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

      {/* Active status */}
      <div className="space-y-2">
        <Label>Status</Label>

        <Controller
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-pressed={field.value}
                onClick={() => field.onChange(true)}
                className={
                  field.value
                    ? "rounded-lg border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors"
                    : "rounded-lg border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
                }
              >
                Active
              </button>

              <button
                type="button"
                aria-pressed={!field.value}
                onClick={() => field.onChange(false)}
                className={
                  !field.value
                    ? "rounded-lg border border-border bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors"
                    : "rounded-lg border border-border bg-background px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"
                }
              >
                Inactive
              </button>
            </div>
          )}
        />

        <p className="text-xs text-muted-foreground">
          Inactive products stay in the catalog but are hidden from active
          selection.
        </p>
      </div>
    </div>
  );
}

export default ProductFormFields;
