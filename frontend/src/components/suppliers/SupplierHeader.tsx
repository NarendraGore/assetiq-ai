"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface SupplierHeaderProps {
  onAdd: () => void;
}

export default function SupplierHeader({
  onAdd,
}: SupplierHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Suppliers
        </h1>

        <p className="text-muted-foreground">
          Manage your suppliers.
        </p>
      </div>

      <Button onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Add Supplier
      </Button>
    </div>
  );
}