"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  id: string;
  name: string;
}

interface ProductFiltersProps {
  categoryId: string;
  supplierId: string;
  minPrice: string;
  maxPrice: string;

  categories: Option[];
  suppliers: Option[];

  onCategoryChange: (
    value: string
  ) => void;

  onSupplierChange: (
    value: string
  ) => void;

  onMinPriceChange: (
    value: string
  ) => void;

  onMaxPriceChange: (
    value: string
  ) => void;
}

export default function ProductFilters({
  categoryId,
  supplierId,
  minPrice,
  maxPrice,
  categories,
  suppliers,
  onCategoryChange,
  onSupplierChange,
  onMinPriceChange,
  onMaxPriceChange,
}: ProductFiltersProps) {
  return (
    <Card>
      <CardContent className="grid gap-5 pt-6 md:grid-cols-4">

        <div className="space-y-2">
          <Label>Category</Label>

          <Select
            value={categoryId || "all"}
            onValueChange={(value) =>
              onCategoryChange(value === "all" ? "" : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                All Categories
              </SelectItem>

              {categories.map(
                (category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </SelectItem>
                )
              )}

            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Supplier</Label>

          <Select
            value={supplierId || "all"}
            onValueChange={(value) =>
              onSupplierChange(value === "all" ? "" : value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Suppliers" />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">
                All Suppliers
              </SelectItem>

              {suppliers.map(
                (supplier) => (
                  <SelectItem
                    key={supplier.id}
                    value={supplier.id}
                  >
                    {supplier.name}
                  </SelectItem>
                )
              )}

            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Min Price</Label>

          <Input
            type="number"
            value={minPrice}
            onChange={(e) =>
              onMinPriceChange(
                e.target.value
              )
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Max Price</Label>

          <Input
            type="number"
            value={maxPrice}
            onChange={(e) =>
              onMaxPriceChange(
                e.target.value
              )
            }
          />
        </div>

      </CardContent>
    </Card>
  );
}