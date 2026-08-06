"use client";

import { Controller, UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { SupplierFormValues } from "../validation";

interface SupplierFormFieldsProps {
  form: UseFormReturn<SupplierFormValues>;
}

export function SupplierFormFields({ form }: SupplierFormFieldsProps) {
  return (
    <div className="space-y-6">
      { }
      <div className="space-y-2">
        <Label htmlFor="companyName">
          Company Name
          <span className="ml-1 text-destructive">*</span>
        </Label>

        <Controller
          control={form.control}
          name="companyName"
          render={({ field, fieldState }) => (
            <>
              <Input
                id="companyName"
                {...field}
                placeholder="Enter company name"
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

      { }
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person</Label>

          <Controller
            control={form.control}
            name="contactPerson"
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="contactPerson"
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Enter contact person"
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

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <>
                <Input
                  id="email"
                  type="email"
                  inputMode="email"
                  {...field}
                  value={field.value ?? ""}
                  placeholder="name@company.com"
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
      </div>

      { }
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>

        <Controller
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <>
              <Input
                id="phone"
                type="tel"
                inputMode="numeric"
                {...field}
                value={field.value ?? ""}
                onChange={(event) =>
                  field.onChange(
                    event.target.value.replace(/\D/g, "").slice(0, 10),
                  )
                }
                placeholder="10-digit phone number"
                autoComplete="off"
                maxLength={10}
                aria-invalid={!!fieldState.error}
                aria-describedby="phone-hint"
                className="tabular-nums"
              />

              {fieldState.error ? (
                <p className="text-sm text-destructive">
                  {fieldState.error.message}
                </p>
              ) : (
                <p id="phone-hint" className="text-xs text-muted-foreground">
                  Digits only, without country code.
                </p>
              )}
            </>
          )}
        />
      </div>

      { }
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>

        <Controller
          control={form.control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <Textarea
                id="address"
                {...field}
                value={field.value ?? ""}
                rows={4}
                maxLength={500}
                placeholder="Enter supplier address"
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
