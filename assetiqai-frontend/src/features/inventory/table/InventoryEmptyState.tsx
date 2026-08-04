"use client";

import { Package, PackageSearch } from "lucide-react";

import { Button } from "@/components/ui/button";

interface InventoryEmptyStateProps {
  title?: string;
  description?: string;
  isSearchResult?: boolean;

  actionLabel?: string;
  onAction?: () => void;
}

export default function InventoryEmptyState({
  title,
  description,
  isSearchResult = false,
  actionLabel,
  onAction,
}: InventoryEmptyStateProps) {
  const heading =
    title ?? (isSearchResult ? "No matching items" : "No inventory yet");

  const subHeading =
    description ??
    (isSearchResult
      ? "Try adjusting your search to find what you're looking for."
      : "Products you add will appear here with their live stock levels.");

  const Icon = isSearchResult ? PackageSearch : Package;

  return (
    <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center shadow-sm">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-8 w-8" />
        </div>

        <h2 className="text-xl font-semibold text-foreground">{heading}</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {subHeading}
        </p>

        {onAction && (
          <Button
            onClick={onAction}
            variant="outline"
            className="mt-6"
          >
            {actionLabel ?? "Try again"}
          </Button>
        )}
      </div>
    </div>
  );
}
