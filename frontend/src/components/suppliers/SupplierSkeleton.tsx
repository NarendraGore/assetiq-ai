"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SupplierSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-72" />
        </div>

        <Skeleton className="h-10 w-36" />
      </div>

      <div className="flex justify-between">
        <Skeleton className="h-10 w-80" />
      </div>

      <div className="rounded-lg border">
        <div className="space-y-4 p-6">
          {Array.from({ length: 8 }).map(
            (_, index) => (
              <Skeleton
                key={index}
                className="h-12 w-full"
              />
            )
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}