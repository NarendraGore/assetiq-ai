"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useReportFilter } from "../../hooks/useReportFilter";

export interface CategoryOption {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  options: readonly CategoryOption[];
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function CategoryFilter({
  options,
  loading = false,
  disabled = false,
  className,
}: CategoryFilterProps) {
  const { filter, updateFilter } = useReportFilter();

  const handleValueChange = (value: string) => {
    updateFilter("categoryId", value === "all" ? undefined : value);

    updateFilter("page", 1);
  };

  return (
    <div className={className}>
      <Select
        value={filter.categoryId ?? "all"}
        onValueChange={handleValueChange}
        disabled={disabled || loading}
      >
        <SelectTrigger
          aria-label="Filter by category"
          className="
            h-10
            w-full
            min-w-[180px]
            rounded-xl
            border-border
            bg-background
            shadow-sm
            transition-all
            duration-200
            focus-visible:border-ring
            focus-visible:ring-2
            focus-visible:ring-ring/20
          "
        >
          <SelectValue
            placeholder={loading ? "Loading categories..." : "Category"}
          />
        </SelectTrigger>

        <SelectContent
          align="start"
          className="
            rounded-xl
            border-border
            bg-popover
          "
        >
          <SelectItem value="all">All Categories</SelectItem>

          {!loading && options.length === 0 && (
            <SelectItem value="no-categories" disabled>
              No categories found
            </SelectItem>
          )}

          {options.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
