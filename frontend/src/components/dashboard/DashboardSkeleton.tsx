import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">

      <Skeleton className="h-10 w-48" />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-32"
          />
        ))}
      </div>

      <Skeleton className="h-96" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-80" />
        <Skeleton className="h-80" />
      </div>

      <Skeleton className="h-96" />

      <Skeleton className="h-96" />
    </div>
  );
}