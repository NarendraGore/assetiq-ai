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

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode?: "create" | "edit";

  /** Required for edit mode — the full product detail is fetched by id. */
  productId?: string;

  loading?: boolean;

  onSubmit: (values: ProductFormValues) => Promise<void> | void;
}

export default function ProductDialog({
  open,
  onOpenChange,

  mode = "create",

  productId,

  loading = false,

  onSubmit,
}: ProductDialogProps) {
  const isCreate = mode === "create";

  /**
   * The list row only carries a slim projection, so edit needs the full
   * detail (categoryId, supplierId, description, minimumStock). Fetch it only
   * while the edit dialog is actually open.
   */
  const shouldFetch = !isCreate && open && !!productId;

  const {
    data: product,
    isLoading: isLoadingDetail,
    isError: isDetailError,
  } = useProduct(shouldFetch ? (productId as string) : "");

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
            defaultValues={isCreate ? null : product}
            loading={loading}
            onSubmit={onSubmit}
            onCancel={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
