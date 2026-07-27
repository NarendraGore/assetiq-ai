"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function InventorySkeleton() {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        {Array.from({
          length: 8,
        }).map((_, index) => (
          <div
            key={index}
            className="h-12 animate-pulse rounded-md bg-muted"
          />
        ))}
      </CardContent>
    </Card>
  );
}