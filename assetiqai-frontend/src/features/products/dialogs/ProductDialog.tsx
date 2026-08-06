"use client";

import { Loader2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ProductFormValues } from "../validation";

import { ProductForm } from "../form/ProductForm";
import { useProduct } from "../hooks/useProduct";
import { useProductLookups } from "../hooks/useProductLookups";
import type { Product, ProductListItem } from "../types";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode?: "create" | "edit";


  productId?: string;


  fallback?: ProductListItem | null;

  loading?: boolean;

  onSubmit: (values: ProductFormValues) => Promise<void> | void;
}

export default function ProductDialog({
  open,
  onOpenChange,

  mode = "create",

  productId,

  fallback,

  loading = false,

  onSubmit,
}: ProductDialogProps) {
  const isCreate = mode === "create";


  const shouldFetch = !isCreate && open && !!productId;

  const {
    data: product,
    isLoading: isLoadingDetail,
    isError: isDetailError,
  } = useProduct(shouldFetch ? (productId as string) : "");

  const { categoryOptions, supplierOptions } = useProductLookups();


  const resolvedProduct: Product | undefined = product
    ? {
        ...product,
        categoryName:
          product.categoryName ||
          fallback?.categoryName ||
          categoryOptions.find((option) => option.id === product.categoryId)
            ?.name ||
          null,
        supplierName:
          product.supplierName ||
          fallback?.supplierName ||
          supplierOptions.find((option) => option.id === product.supplierId)
            ?.name ||
          null,
      }
    : undefined;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!loading) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <DialogContent
        className="sm:max-w-2xl"
        onPointerDownOutside={(event) => {
          if (loading) {
            event.preventDefault();
          }
        }}
        onEscapeKeyDown={(event) => {
          if (loading) {
            event.preventDefault();
          }
        }}
      >
        <DialogHeader className="space-y-2">
          <DialogTitle>
            {isCreate ? "Create Product" : "Edit Product"}
          </DialogTitle>

          <DialogDescription>
            {isCreate
              ? "Add a new product to your inventory catalog."
              : "Update the product information. Changes will be reflected throughout the system."}
          </DialogDescription>
        </DialogHeader>

        {!isCreate && isLoadingDetail ? (
          <div className="flex min-h-[240px] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : !isCreate && isDetailError ? (
          <div className="flex min-h-[240px] items-center justify-center px-6 text-center text-sm text-muted-foreground">
            Unable to load this product&apos;s details. Please close and try
            again.
          </div>
        ) : (
          <ProductForm
            mode={mode}
            defaultValues={isCreate ? null : resolvedProduct}
            loading={loading}
            onSubmit={onSubmit}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
