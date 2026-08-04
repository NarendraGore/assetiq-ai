"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useReportFilter } from "../../hooks/useReportFilter";

export interface SupplierOption {
  id: string;
  name: string;
}

interface SupplierFilterProps {
  options: readonly SupplierOption[];
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function SupplierFilter({
  options,
  loading = false,
  disabled = false,
  className,
}: SupplierFilterProps) {
  const { filter, updateFilter } = useReportFilter();

  const handleValueChange = (value: string) => {
    updateFilter("supplierId", value === "all" ? undefined : value);

    updateFilter("page", 1);
  };

  return (
    <div className={className}>
      <Select
        value={filter.supplierId ?? "all"}
        onValueChange={handleValueChange}
        disabled={disabled || loading}
      >
        <SelectTrigger
          aria-label="Filter by supplier"
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
            placeholder={loading ? "Loading suppliers..." : "Supplier"}
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
          <SelectItem value="all">All Suppliers</SelectItem>

          {!loading && options.length === 0 && (
            <SelectItem value="no-suppliers" disabled>
              No suppliers found
            </SelectItem>
          )}

          {options.map((supplier) => (
            <SelectItem key={supplier.id} value={supplier.id}>
              {supplier.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
