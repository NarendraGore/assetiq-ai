"use client";

import { useEffect } from "react";

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Package,
  Hash,
  Tag,
  IndianRupee,
  Boxes,
  CheckCircle2,
  ImageIcon,
} from "lucide-react";

import {
  productSchema,
  ProductFormValues,
} from "@/lib/validations/product-schema";

import { Product } from "@/types/product";

import { useCategories } from "@/hooks/useCategories";
import { useSuppliers } from "@/hooks/useSuppliers";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

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

import { Switch } from "@/components/ui/switch";

import { Separator } from "@/components/ui/separator";

import ProductImageUpload from "./ProductImageUpload";

interface ProductFormProps {
  initialData?: Product | null;

  loading?: boolean;

  onSubmit: (values: ProductFormValues) => void;

  onCancel: () => void;
}

export default function ProductForm({
  initialData,
  loading = false,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  /*
   * Fetch Categories
   */

  const { data: categoryResponse } = useCategories(1, 100, "");

  /*
   * Fetch Suppliers
   */

  const { data: supplierResponse } = useSuppliers(1, 100, "");

  const categories = categoryResponse?.items ?? [];

  const suppliers = supplierResponse?.items ?? [];

  /*
   * React Hook Form
   */

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
      description: "",
      categoryId: "",
      supplierId: "",
      unitPrice: 0,
      stockQuantity: 0,
      minimumStock: 0,
      imageUrl: "",
      isActive: true,
    },
  });

  /*
   * Populate Form
   */

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,

        sku: initialData.sku,

        description: initialData.description ?? "",

        categoryId: initialData.categoryId,

        supplierId: initialData.supplierId,

        unitPrice: initialData.unitPrice,

        stockQuantity: initialData.stockQuantity,

        minimumStock: initialData.minimumStock,

        imageUrl: initialData.imageUrl ?? "",

        isActive: initialData.isActive,
      });
    } else {
      reset({
        name: "",

        sku: "",

        description: "",

        categoryId: "",

        supplierId: "",

        unitPrice: 0,

        stockQuantity: 0,

        minimumStock: 0,

        imageUrl: "",

        isActive: true,
      });
    }
  }, [initialData, reset]);

  /*
   * Watch Values
   */

  const description = watch("description") || "";

  const categoryId = watch("categoryId");

  const supplierId = watch("supplierId");

  const imageUrl = watch("imageUrl");

  const isActive = watch("isActive");

  /*
   * JSX starts in Part 2
   */

  return (
    <Card className="shadow-lg border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Product Information
        </CardTitle>

        <CardDescription>Fill in the product details below.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* ================= Basic Info ================= */}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Product Name */}

            <div className="space-y-2">
              <Label>
                Product Name
                <span className="text-destructive">*</span>
              </Label>

              <div className="relative">
                <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder="Product Name"
                  className="pl-10"
                  {...register("name")}
                />
              </div>

              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* SKU */}

            <div className="space-y-2">
              <Label>
                SKU
                <span className="text-destructive">*</span>
              </Label>

              <div className="relative">
                <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  placeholder="SKU-001"
                  className="pl-10"
                  {...register("sku")}
                />
              </div>

              {errors.sku && (
                <p className="text-sm text-destructive">{errors.sku.message}</p>
              )}
            </div>
          </div>

          {/* ================= Category + Supplier ================= */}

          <div className="grid gap-6 md:grid-cols-2">
            {/* Category */}

            <div className="space-y-2">
              <Label>
                Category
                <span className="text-destructive">*</span>
              </Label>

              <Controller
                control={control}
                name="categoryId"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.categoryId && (
                <p className="text-sm text-destructive">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            {/* Supplier */}

            <div className="space-y-2">
              <Label>
                Supplier
                <span className="text-destructive">*</span>
              </Label>

              <Controller
                control={control}
                name="supplierId"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Supplier" />
                    </SelectTrigger>

                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.companyName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.supplierId && (
                <p className="text-sm text-destructive">
                  {errors.supplierId.message}
                </p>
              )}
            </div>
          </div>

          {/* ================= Inventory ================= */}

          <div className="grid gap-6 md:grid-cols-3">
            {/* Unit Price */}

            <div className="space-y-2">
              <Label>Unit Price</Label>

              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  type="number"
                  className="pl-10"
                  {...register("unitPrice", {
                    valueAsNumber: true,
                  })}
                />
              </div>

              {errors.unitPrice && (
                <p className="text-sm text-destructive">
                  {errors.unitPrice.message}
                </p>
              )}
            </div>

            {/* Stock */}

            <div className="space-y-2">
              <Label>Stock Quantity</Label>

              <div className="relative">
                <Boxes className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  type="number"
                  className="pl-10"
                  {...register("stockQuantity", {
                    valueAsNumber: true,
                  })}
                />
              </div>

              {errors.stockQuantity && (
                <p className="text-sm text-destructive">
                  {errors.stockQuantity.message}
                </p>
              )}
            </div>

            {/* Minimum Stock */}

            <div className="space-y-2">
              <Label>Minimum Stock</Label>

              <div className="relative">
                <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  type="number"
                  className="pl-10"
                  {...register("minimumStock", {
                    valueAsNumber: true,
                  })}
                />
              </div>

              {errors.minimumStock && (
                <p className="text-sm text-destructive">
                  {errors.minimumStock.message}
                </p>
              )}
            </div>
          </div>

          {/* ================= Description ================= */}

          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              rows={5}
              placeholder="Enter product description..."
              {...register("description")}
            />
            <div className="flex justify-end">
              <p className="text-xs text-muted-foreground">
                {description.length}/500
              </p>
            </div>
            {errors.description && (
              <p className="text-sm text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* ================= Image ================= */}

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Product Image
            </Label>

            <Controller
              control={control}
              name="imageUrl"
              render={({ field }) => (
                <ProductImageUpload
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <Separator />

          {/* ================= Status ================= */}

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />

              <div>
                <p className="font-medium">Active Product</p>

                <p className="text-sm text-muted-foreground">
                  Enable this product for selling.
                </p>
              </div>
            </div>

            <Controller
              control={control}
              name="isActive"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {/* ================= Buttons ================= */}

          <div className="flex justify-end gap-3 border-t pt-6">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : initialData
                  ? "Update Product"
                  : "Save Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
