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
  options?: SupplierOption[];
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function SupplierFilter({
  options = [],
  loading = false,
  disabled = false,
  className,
}: SupplierFilterProps) {
  const { filter, updateFilter } = useReportFilter();

  return (
    <div className={className}>
      <Select
        value={filter.supplierId ?? "all"}
        disabled={disabled || loading}
        onValueChange={(value) => {
          updateFilter("supplierId", value === "all" ? undefined : value);

          updateFilter("page", 1);
        }}
      >
        <SelectTrigger
          aria-label="Filter by supplier"
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
          <SelectValue placeholder="Supplier" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Suppliers</SelectItem>

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
