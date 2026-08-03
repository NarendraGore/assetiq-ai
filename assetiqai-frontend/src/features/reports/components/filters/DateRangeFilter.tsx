"use client";

import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useReportFilter } from "../../hooks/useReportFilter";

import type { DateRange } from "../../types";

interface DateRangeOption {
  label: string;
  value: DateRange;
}

interface DateRangeFilterProps {
  options?: DateRangeOption[];
  className?: string;
}

const DEFAULT_OPTIONS: DateRangeOption[] = [
  {
    label: "Today",
    value: "today",
  },
  {
    label: "Last 7 Days",
    value: "last7Days",
  },
  {
    label: "Last 30 Days",
    value: "last30Days",
  },
  {
    label: "This Month",
    value: "thisMonth",
  },
  {
    label: "This Year",
    value: "thisYear",
  },
];

export default function DateRangeFilter({
  options = DEFAULT_OPTIONS,
  className,
}: DateRangeFilterProps) {
  const { filter, updateFilter } = useReportFilter();

  return (
    <div
      className={`
        flex
        flex-wrap
        items-center
        gap-2
        ${className ?? ""}
      `}
    >
      {options.map((option) => {
        const active = filter.dateRange === option.value;

        return (
          <Button
            key={option.value}
            type="button"
            variant={active ? "default" : "outline"}
            size="sm"
            onClick={() => {
              updateFilter("dateRange", option.value);
              updateFilter("page", 1);
            }}
            aria-pressed={active}
            className={`
    transition-all
    duration-200

    ${active ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}
  `}
          >
            <Calendar className="mr-2 h-4 w-4" />

            {option.label}
          </Button>
        );
      })}
    </div>
  );
}
