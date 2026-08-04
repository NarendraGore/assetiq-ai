"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({
  rows = 8,
  columns = 6,
}: TableSkeletonProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 border-b p-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-10 w-full max-w-sm" />

        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-muted">
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} className="px-4 py-3 text-left">
                  <Skeleton className="h-4 w-24" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-t">
                {Array.from({ length: columns }).map((_, columnIndex) => (
                  <td key={columnIndex} className="px-4 py-4">
                    <Skeleton className="h-4 w-full max-w-[120px]" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 border-t p-4 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-4 w-48" />

        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-4 w-24" />

          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </div>
  );
}
