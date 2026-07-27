"use client";

import { Button } from "@/components/ui/button";

interface CategoryHeaderProps {
  onAdd: () => void;
}

export default function CategoryHeader({
  onAdd,
}: CategoryHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Categories
        </h1>

        <p className="text-muted-foreground">
          Manage your product categories.
        </p>
      </div>

      <Button onClick={onAdd}>
        + Add Category
      </Button>
    </div>
  );
}