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

import type { StockAction } from "../hooks/useStockDialogs";
import type { StockFormValues } from "../hooks/useStockForm";
import type { ProductOption } from "../hooks/useProductOptions";

interface StockTransactionFieldsProps {
  action: StockAction;
  form: UseFormReturn<StockFormValues>;

  options: ProductOption[];
  isLoadingOptions?: boolean;


  lockedProduct?: ProductOption | null;
}

const QUANTITY_LABEL: Record<StockAction, string> = {
  in: "Quantity to add",
  out: "Quantity to remove",
  adjust: "Adjustment (+/-)",
};

const QUANTITY_HELP: Record<StockAction, string> = {
  in: "Whole units to add to the current stock.",
  out: "Whole units to remove from the current stock.",
  adjust:
    "Signed delta applied to current stock — use a negative value to reduce.",
};

export default function StockTransactionFields({
  action,
  form,
  options,
  isLoadingOptions = false,
  lockedProduct = null,
}: StockTransactionFieldsProps) {
  const isAdjust = action === "adjust";

  const selectedId = form.watch("productId");
  const quantity = form.watch("quantity");

  const selected =
    lockedProduct ?? options.find((option) => option.productId === selectedId);

  const projectedStock =
    selected && typeof quantity === "number" && !Number.isNaN(quantity)
      ? action === "out"
        ? selected.currentStock - quantity
        : selected.currentStock + quantity
      : undefined;

  return (
    <div className="space-y-6">
      { }
      <div className="space-y-2">
        <Label htmlFor="productId">
          Product
          <span className="ml-1 text-destructive">*</span>
        </Label>

        {lockedProduct ? (
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2">
            <div className="flex flex-col">
              <span className="font-medium text-foreground">
                {lockedProduct.productName}
              </span>
              <span className="text-xs text-muted-foreground">
                {lockedProduct.sku}
              </span>
            </div>

            <span className="text-sm tabular-nums text-muted-foreground">
              {lockedProduct.currentStock.toLocaleString("en-IN")} in stock
            </span>
          </div>
        ) : (
          <Controller
            control={form.control}
            name="productId"
            render={({ field, fieldState }) => (
              <>
                <Select
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                  disabled={isLoadingOptions}
                >
                  <SelectTrigger
                    id="productId"
                    className="w-full"
                    aria-invalid={!!fieldState.error}
                  >
                    <SelectValue
                      placeholder={
                        isLoadingOptions
                          ? "Loading products..."
                          : "Select a product"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem
                        key={option.productId}
                        value={option.productId}
                      >
                        {option.productName} · {option.sku}
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
        )}

        {selected && !lockedProduct && (
          <p className="text-xs text-muted-foreground">
            Current stock:{" "}
            <span className="font-medium tabular-nums text-foreground">
              {selected.currentStock.toLocaleString("en-IN")}
            </span>
          </p>
        )}
      </div>

      { }
      <div className="space-y-2">
        <Label htmlFor="quantity">
          {QUANTITY_LABEL[action]}
          <span className="ml-1 text-destructive">*</span>
        </Label>

        <Controller
          control={form.control}
          name="quantity"
          render={({ field, fieldState }) => (
            <>
              <Input
                id="quantity"
                type="number"
                inputMode="numeric"
                step="1"
                min={isAdjust ? undefined : 1}
                {...field}
                value={field.value ?? ""}
                placeholder={isAdjust ? "e.g. -5 or 10" : "0"}
                aria-invalid={!!fieldState.error}
                className="tabular-nums"
              />

              {fieldState.error ? (
                <p className="text-sm text-destructive">
                  {fieldState.error.message}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {QUANTITY_HELP[action]}
                </p>
              )}
            </>
          )}
        />

        {projectedStock !== undefined && (
          <p className="text-xs text-muted-foreground">
            New stock will be{" "}
            <span
              className={`font-semibold tabular-nums ${
                projectedStock < 0 ? "text-destructive" : "text-foreground"
              }`}
            >
              {projectedStock.toLocaleString("en-IN")}
            </span>
            {projectedStock < 0 && " — this exceeds available stock."}
          </p>
        )}
      </div>

      { }
      <div className="space-y-2">
        <Label htmlFor="remarks">Remarks</Label>

        <Controller
          control={form.control}
          name="remarks"
          render={({ field, fieldState }) => (
            <>
              <Textarea
                id="remarks"
                {...field}
                value={field.value ?? ""}
                rows={3}
                maxLength={250}
                placeholder="Optional note about this transaction"
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
                  {(field.value ?? "").length}/250
                </span>
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
}
