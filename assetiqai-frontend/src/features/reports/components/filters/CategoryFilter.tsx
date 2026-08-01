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
  options: CategoryOption[];
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

  return (
    <div className={className}>
      <Select
        value={filter.categoryId ?? "all"}
        disabled={disabled || loading}
        onValueChange={(value) => {
          updateFilter("categoryId", value === "all" ? undefined : value);

          updateFilter("page", 1);
        }}
      >
        <SelectTrigger
          aria-label="Filter by category"
          className="
            w-full
            min-w-[180px]
            bg-background
            border-border
            shadow-sm
            transition-all
            duration-200
            focus-visible:ring-2
            focus-visible:ring-blue-500/20
            focus-visible:border-blue-500
          "
        >
          <SelectValue
            placeholder={loading ? "Loading categories..." : "Category"}
          />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>

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
