"use client";

import { Button } from "@/components/ui/button";
import { Package, Plus } from "lucide-react";

interface ProductEmptyStateProps {
  title?: string;
  description?: string;
  isSearchResult?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

export function ProductEmptyState({
  title,
  description,
  isSearchResult = false,
  actionLabel = "Add Product",
  onAction,
}: ProductEmptyStateProps) {
  const heading = title
    ? title
    : isSearchResult
      ? "No matching products found"
      : "No products available";

  const subHeading = description
    ? description
    : isSearchResult
      ? "Try adjusting your search or filters, or clear them to view all products."
      : "Get started by adding your first product.";

  return (
    <div
      className="
        flex
        min-h-[420px]
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-border
        bg-card
        px-6
        py-12
        text-center
        shadow-sm
      "
    >
      <div className="mx-auto flex max-w-md flex-col items-center">
        { }
        <div
          className="
            mb-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-primary/10
            text-primary
          "
        >
          <Package className="h-8 w-8" />
        </div>

        { }
        <h2 className="text-xl font-semibold text-foreground">{heading}</h2>

        { }
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {subHeading}
        </p>

        { }
        {!isSearchResult && onAction && (
          <Button
            type="button"
            className="mt-8 bg-primary hover:bg-primary/90"
            onClick={onAction}
          >
            <Plus className="mr-2 h-4 w-4" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProductEmptyState;
