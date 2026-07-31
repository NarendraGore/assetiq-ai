"use client";

import { Button } from "@/components/ui/button";

import {
  DashboardFilter,
  dashboardFilterOptions,
} from "./dashboard-filter-options";

interface DashboardFiltersProps {
  value: DashboardFilter;

  onChange: (value: DashboardFilter) => void;
}

export default function DashboardFilters({
  value,
  onChange,
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {dashboardFilterOptions.map((filter) => (
        <Button
          key={filter.value}
          variant={value === filter.value ? "default" : "outline"}
          onClick={() => onChange(filter.value)}
          className="rounded-xl"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
