"use client";

import { Button } from "@/components/ui/button";
import { Plus, Truck } from "lucide-react";

interface SupplierEmptyStateProps {
  title?: string;
  description?: string;
  isSearchResult?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

export function SupplierEmptyState({
  title,
  description,
  isSearchResult = false,
  actionLabel = "Add Supplier",
  onAction,
}: SupplierEmptyStateProps) {
  const heading = title
    ? title
    : isSearchResult
      ? "No matching suppliers found"
      : "No suppliers available";

  const subHeading = description
    ? description
    : isSearchResult
      ? "Try adjusting your search criteria or clear the search to view all suppliers."
      : "Get started by adding your first supplier.";

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
        {/* Icon */}
        <div
          className="
            mb-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-blue-50
            text-blue-600
            dark:bg-blue-950/20
            dark:text-blue-400
          "
        >
          <Truck className="h-8 w-8" />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-foreground">{heading}</h2>

        {/* Description */}
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {subHeading}
        </p>

        {/* Action */}
        {!isSearchResult && onAction && (
          <Button
            type="button"
            className="mt-8 bg-blue-600 hover:bg-blue-700"
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

export default SupplierEmptyState;
