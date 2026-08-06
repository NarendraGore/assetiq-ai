"use client";

import { Loader2, Pencil } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils/formatCurrency";

import { useProduct } from "../hooks/useProduct";
import { useProductLookups } from "../hooks/useProductLookups";
import type { ProductListItem } from "../types";

interface ProductDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  productId?: string;


  fallback?: ProductListItem | null;

  onEdit?: () => void;
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-3 last:border-none sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground sm:text-right">
        {children}
      </span>
    </div>
  );
}

function formatDate(value?: string | null): string {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function ProductDetailsDialog({
  open,
  onOpenChange,
  productId,
  fallback,
  onEdit,
}: ProductDetailsDialogProps) {
  const shouldFetch = open && !!productId;

  const {
    data: product,
    isLoading,
    isError,
  } = useProduct(shouldFetch ? (productId as string) : "");

  const { categoryOptions, supplierOptions } = useProductLookups();


  const categoryName =
    product?.categoryName ||
    fallback?.categoryName ||
    categoryOptions.find((option) => option.id === product?.categoryId)?.name ||
    null;

  const supplierName =
    product?.supplierName ||
    fallback?.supplierName ||
    supplierOptions.find((option) => option.id === product?.supplierId)?.name ||
    null;

  const stock = product?.stockQuantity ?? 0;

  const stockVariant =
    stock === 0 ? "destructive" : stock < 10 ? "secondary" : "outline";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="space-y-2">
          <DialogTitle>Product Details</DialogTitle>

          <DialogDescription>
            Full information for the selected product.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex min-h-[240px] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : isError || !product ? (
          <div className="flex min-h-[240px] items-center justify-center px-6 text-center text-sm text-muted-foreground">
            Unable to load this product&apos;s details. Please close and try
            again.
          </div>
        ) : (
          <div className="space-y-6">
            { }
            <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-border bg-muted/40 p-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  SKU: {product.sku}
                </p>
              </div>

              <Badge variant={product.isActive ? "default" : "ghost"}>
                {product.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>

            { }
            <div className="rounded-xl border border-border px-4">
              <DetailRow label="Category">
                {categoryName || "—"}
              </DetailRow>

              <DetailRow label="Supplier">
                {supplierName || "—"}
              </DetailRow>

              <DetailRow label="Unit Price">
                {formatCurrency(product.unitPrice)}
              </DetailRow>

              <DetailRow label="Stock Quantity">
                <Badge variant={stockVariant} className="tabular-nums">
                  {stock === 0
                    ? "Out of stock"
                    : `${stock.toLocaleString("en-IN")} in stock`}
                </Badge>
              </DetailRow>

              <DetailRow label="Minimum Stock">
                <span className="tabular-nums">
                  {product.minimumStock.toLocaleString("en-IN")}
                </span>
              </DetailRow>

              <DetailRow label="Created">
                {formatDate(product.createdAt)}
              </DetailRow>

              <DetailRow label="Last Updated">
                {formatDate(product.updatedAt)}
              </DetailRow>
            </div>

            { }
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Description</span>
              <p className="text-sm leading-6 text-foreground">
                {product.description?.trim()
                  ? product.description
                  : "No description provided."}
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>

          {onEdit && product && (
            <Button onClick={onEdit} className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
