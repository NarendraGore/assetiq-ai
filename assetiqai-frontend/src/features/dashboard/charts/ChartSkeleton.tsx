"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ChartSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-40" />

      <Skeleton className="h-[320px] w-full rounded-xl" />
    </div>
  );
}
