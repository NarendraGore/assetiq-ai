"use client";

import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useReportFilter } from "../../hooks/useReportFilter";

import type { DateRangePreset } from "../../types";

interface DateRangeOption {
  label: string;
  value: DateRangePreset;
}

interface DateRangeFilterProps {
  options?: DateRangeOption[];
  className?: string;
}


const DEFAULT_OPTIONS: DateRangeOption[] = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "last7Days" },
  { label: "Last 30 Days", value: "last30Days" },
  { label: "This Month", value: "thisMonth" },
  { label: "This Year", value: "thisYear" },
  { label: "All Time", value: "allTime" },
];

export default function DateRangeFilter({
  options = DEFAULT_OPTIONS,
  className,
}: DateRangeFilterProps) {
  const { filter, setDateRangePreset } = useReportFilter();

  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${className ?? ""}`}
      role="group"
      aria-label="Date range"
    >
      {options.map((option) => {
        const active = filter.dateRangePreset === option.value;

        return (
          <Button
            key={option.value}
            type="button"
            variant={active ? "default" : "outline"}
            size="sm"
            onClick={() => setDateRangePreset(option.value)}
            aria-pressed={active}
            className="transition-all duration-200"
          >
            <Calendar className="mr-2 h-4 w-4" />

            {option.label}
          </Button>
        );
      })}
    </div>
  );
}
