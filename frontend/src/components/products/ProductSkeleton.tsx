"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function ProductSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-10 w-64 animate-pulse rounded bg-muted" />

      <Card>
        <CardContent className="space-y-4 pt-6">
          {Array.from({
            length: 8,
          }).map((_, index) => (
            <div
              key={index}
              className="h-10 animate-pulse rounded bg-muted"
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}