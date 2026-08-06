"use client";

import { Skeleton } from "@/components/ui/skeleton";

/**
 * Card count and grid must mirror `DashboardSummary` (six cards), otherwise the
 * layout visibly reflows the moment the real data lands.
 */
export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-72 rounded-xl" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-40 rounded-2xl" />
        ))}
      </div>

      <Skeleton className="h-96 rounded-2xl" />
    </div>
  );
}
