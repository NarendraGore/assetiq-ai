import { Skeleton } from "@/components/ui/skeleton";

interface ProductSkeletonProps {
  rows?: number;
}

export function ProductSkeleton({ rows = 8 }: ProductSkeletonProps) {
  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Header */}
        <div className="grid grid-cols-7 gap-4 border-b border-border bg-muted/40 px-6 py-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="ml-auto h-4 w-16" />
        </div>

        {/* Rows */}
        <div>
          {Array.from({ length: rows }).map((_, index) => (
            <div
              key={index}
              className="
                grid
                grid-cols-7
                gap-4
                border-b
                border-border
                px-6
                py-4
                last:border-none
              "
            >
              <div className="space-y-1.5">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-3 w-20" />
              </div>

              <Skeleton className="h-5 w-24" />

              <Skeleton className="h-5 w-28" />

              <Skeleton className="h-5 w-20" />

              <Skeleton className="h-6 w-24 rounded-full" />

              <Skeleton className="h-6 w-16 rounded-full" />

              <div className="ml-auto flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-4 w-44" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;
