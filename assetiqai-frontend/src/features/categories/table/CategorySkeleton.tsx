import { Skeleton } from "@/components/ui/skeleton";

interface CategorySkeletonProps {
  rows?: number;
}

export function CategorySkeleton({ rows = 8 }: CategorySkeletonProps) {
  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="h-10 w-full max-w-sm rounded-lg" />

        <div className="flex items-center justify-end gap-2">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 border-b border-border bg-muted/40 px-6 py-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="ml-auto h-4 w-16" />
        </div>

        {/* Rows */}
        <div>
          {Array.from({ length: rows }).map((_, index) => (
            <div
              key={index}
              className="
                grid
                grid-cols-5
                gap-4
                border-b
                border-border
                px-6
                py-4
                last:border-none
              "
            >
              <Skeleton className="h-5 w-36" />

              <Skeleton className="h-5 w-full max-w-xs" />

              <Skeleton className="h-5 w-32" />

              <Skeleton className="h-5 w-32" />

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

export default CategorySkeleton;
