"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-72 rounded-xl" />

      <div
        className="grid
grid-cols-1
gap-5
sm:grid-cols-2
xl:grid-cols-4"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-32 rounded-2xl" />
        ))}
      </div>

      <Skeleton className="h-96 rounded-2xl" />
    </div>
  );
}
