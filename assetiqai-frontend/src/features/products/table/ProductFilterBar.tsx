"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { LookupOption } from "../hooks/useProductLookups";

const ALL = "all";

interface ProductFilterBarProps {
  categoryId?: string;
  supplierId?: string;

  minPriceInput: string;
  maxPriceInput: string;

  categoryOptions: LookupOption[];
  supplierOptions: LookupOption[];

  isLoadingLookups?: boolean;
  hasActiveFilters?: boolean;

  onCategoryChange: (value?: string) => void;
  onSupplierChange: (value?: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onReset: () => void;
}

export default function ProductFilterBar({
  categoryId,
  supplierId,

  minPriceInput,
  maxPriceInput,

  categoryOptions,
  supplierOptions,

  isLoadingLookups = false,
  hasActiveFilters = false,

  onCategoryChange,
  onSupplierChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}: ProductFilterBarProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div
        className="
          grid
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {/* Category */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Category</Label>

          <Select
            value={categoryId ?? ALL}
            onValueChange={(value) => onCategoryChange(value)}
            disabled={isLoadingLookups}
          >
            <SelectTrigger className="h-9 w-full">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={ALL}>All categories</SelectItem>

              {categoryOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Supplier */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Supplier</Label>

          <Select
            value={supplierId ?? ALL}
            onValueChange={(value) => onSupplierChange(value)}
            disabled={isLoadingLookups}
          >
            <SelectTrigger className="h-9 w-full">
              <SelectValue placeholder="All suppliers" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value={ALL}>All suppliers</SelectItem>

              {supplierOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Min price */}
        <div className="space-y-1.5">
          <Label htmlFor="minPrice" className="text-xs text-muted-foreground">
            Min price
          </Label>

          <Input
            id="minPrice"
            type="number"
            inputMode="decimal"
            min={0}
            value={minPriceInput}
            placeholder="0"
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="h-9 tabular-nums"
          />
        </div>

        {/* Max price */}
        <div className="space-y-1.5">
          <Label htmlFor="maxPrice" className="text-xs text-muted-foreground">
            Max price
          </Label>

          <Input
            id="maxPrice"
            type="number"
            inputMode="decimal"
            min={0}
            value={maxPriceInput}
            placeholder="Any"
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="h-9 tabular-nums"
          />
        </div>

        {/* Reset */}
        <div className="flex items-end">
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            disabled={!hasActiveFilters}
            className="h-9 w-full gap-2"
          >
            <X className="h-4 w-4" />
            Clear filters
          </Button>
        </div>
      </div>
    </div>
  );
}
