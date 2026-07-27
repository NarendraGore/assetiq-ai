"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  stockInSchema,
  stockOutSchema,
  stockAdjustSchema,
  StockInFormValues,
  StockOutFormValues,
  StockAdjustFormValues,
} from "@/lib/validations/stock-schema";

import { useProducts } from "@/hooks/useProducts";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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

export type StockTransactionFormValues =
  | StockInFormValues
  | StockOutFormValues
  | StockAdjustFormValues;

interface Props {
  mode: "in" | "out" | "adjust";
  loading?: boolean;
  onSubmit: (values: StockTransactionFormValues) => void;
  onCancel: () => void;
}

export default function StockTransactionForm({
  mode,
  loading = false,
  onSubmit,
  onCancel,
}: Props) {
  const schema =
    mode === "in"
      ? stockInSchema
      : mode === "out"
      ? stockOutSchema
      : stockAdjustSchema;

  const { data } = useProducts({
    page: 1,
    pageSize: 100,
    search: "",
  });

  const products = data?.items ?? [];

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StockTransactionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      productId: "",
      quantity: 1,
      newQuantity: 0,
      remarks: "",
    } as StockTransactionFormValues,
  });

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      className="space-y-5"
    >
      {/* Product */}

      <div className="space-y-2">
        <Label>Product</Label>

        <Controller
          control={control}
          name="productId"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Product" />
              </SelectTrigger>

              <SelectContent>
                {products.map((product) => (
                  <SelectItem
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.productId && (
          <p className="text-sm text-destructive">
            {String(errors.productId.message)}
          </p>
        )}
      </div>

      {/* Quantity */}

      <div className="space-y-2">
        <Label>
          {mode === "adjust"
            ? "New Quantity"
            : "Quantity"}
        </Label>

        {mode === "adjust" ? (
          <Input
            type="number"
            {...register("newQuantity", {
              valueAsNumber: true,
            })}
          />
        ) : (
          <Input
            type="number"
            {...register("quantity", {
              valueAsNumber: true,
            })}
          />
        )}
      </div>

      {/* Remarks */}

      <div className="space-y-2">
        <Label>Remarks</Label>

        <Textarea
          rows={4}
          {...register("remarks")}
        />
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
        >
          {mode === "in" && "Add Stock"}
          {mode === "out" && "Remove Stock"}
          {mode === "adjust" && "Adjust Stock"}
        </Button>
      </DialogFooter>
    </form>
  );
}