"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import ProductForm from "./ProductForm";

import { Product } from "@/types/product";

import { ProductFormValues } from "@/lib/validations/product-schema";

interface ProductDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  product?: Product | null;

  loading?: boolean;

  onSubmit: (values: ProductFormValues) => void;
}

export default function ProductDialog({
  open,
  onOpenChange,
  product,
  loading = false,
  onSubmit,
}: ProductDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product
              ? "Edit Product"
              : "Create Product"}
          </DialogTitle>

          <DialogDescription>
            {product
              ? "Update product information."
              : "Add a new product to your inventory."}
          </DialogDescription>
        </DialogHeader>

        <ProductForm
          key={product?.id ?? "new"}
          initialData={product}
          loading={loading}
          onSubmit={onSubmit}
          onCancel={() =>
            onOpenChange(false)
          }
        />
      </DialogContent>
    </Dialog>
  );
}