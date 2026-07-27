"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ProductHeaderProps {
  onAdd: () => void;
}

export default function ProductHeader({
  onAdd,
}: ProductHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <p className="text-muted-foreground">
          Manage all products in your inventory.
        </p>
      </div>

      <Button onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Add Product
      </Button>
    </div>
  );
}