"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useReportFilter } from "../../hooks/useReportFilter";

interface TransactionTypeOption {
  value: number;
  label: string;
}

interface TransactionTypeFilterProps {
  options?: TransactionTypeOption[];
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const DEFAULT_OPTIONS: TransactionTypeOption[] = [
  {
    value: 1,
    label: "Stock In",
  },
  {
    value: 2,
    label: "Stock Out",
  },
  {
    value: 3,
    label: "Adjustment",
  },
];

export default function TransactionTypeFilter({
  options = DEFAULT_OPTIONS,
  disabled = false,
  loading = false,
  className,
}: TransactionTypeFilterProps) {
  const { filter, updateFilter } = useReportFilter();

  return (
    <div className={className}>
      <Select
        value={
          filter.transactionType !== undefined
            ? String(filter.transactionType)
            : "all"
        }
        disabled={disabled || loading}
        onValueChange={(value) => {
          updateFilter(
            "transactionType",
            value === "all" ? undefined : Number(value),
          );

          updateFilter("page", 1);
        }}
      >
        <SelectTrigger
          aria-label="Filter by transaction type"
          className="
            min-w-[180px]
            w-full
            border-border
            bg-background
            shadow-sm
            transition-all
            duration-200
            focus-visible:ring-2
            focus-visible:ring-ring/20
            focus-visible:border-ring
          "
        >
          <SelectValue placeholder="Transaction Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Transactions</SelectItem>

          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
