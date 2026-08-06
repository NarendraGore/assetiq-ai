"use client";

import { AlertTriangle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import type { InventoryItem } from "../types";
import { useLowStock } from "../hooks";

interface LowStockBannerProps {

  onRestock: (item: InventoryItem) => void;
}


export default function LowStockBanner({ onRestock }: LowStockBannerProps) {
  const { data, isLoading } = useLowStock();

  if (isLoading) {
    return <Skeleton className="h-20 w-full rounded-2xl" />;
  }

  const items = data ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      role="alert"
      className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 shadow-sm dark:border-amber-900/40 dark:bg-amber-900/10"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            <AlertTriangle className="h-5 w-5" />
          </span>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                Low stock alert
              </h2>

              <Badge className="bg-amber-100 tabular-nums text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                {items.length}
              </Badge>
            </div>

            <p className="text-sm text-amber-800/80 dark:text-amber-200/70">
              {items.length === 1
                ? "1 product is at or below its minimum level."
                : `${items.length} products are at or below their minimum level.`}{" "}
              Click a product to restock it.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.productId}
            type="button"
            onClick={() => onRestock(item)}
            className="group inline-flex items-center gap-2 rounded-full border border-amber-300 bg-white/70 px-3 py-1 text-xs font-medium text-amber-900 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 dark:border-amber-900/50 dark:bg-transparent dark:text-amber-200 dark:hover:bg-amber-900/20"
          >
            <span className="max-w-[160px] truncate">{item.productName}</span>
            <span className="tabular-nums text-amber-600 dark:text-amber-400">
              {item.currentStock}/{item.minimumStock}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
