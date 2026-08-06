import { Skeleton } from "@/components/ui/skeleton";

interface InventorySkeletonProps {
  rows?: number;
  columns?: number;
}

/**
 * Generic table skeleton reused by the Inventory and History tables.
 */
export default function InventorySkeleton({
  rows = 8,
  columns = 8,
}: InventorySkeletonProps) {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div
          className="grid gap-4 border-b border-border bg-muted/40 px-6 py-4"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-20" />
          ))}
        </div>

        <div>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-4 border-b border-border px-6 py-4 last:border-none"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: columns }).map((_, cellIndex) => (
                <Skeleton key={cellIndex} className="h-5 w-24" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
