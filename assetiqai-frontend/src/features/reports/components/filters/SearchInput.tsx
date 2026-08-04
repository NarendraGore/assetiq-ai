"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useReportFilter } from "../../hooks/useReportFilter";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  placeholder = "Search reports...",
  className,
}: SearchInputProps) {
  const { filter, updateFilter } = useReportFilter();

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <Search
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          h-4
          w-4
          -translate-y-1/2
          text-muted-foreground
        "
      />

      <Input
        aria-label="Search reports"
        value={filter.search}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        onChange={(event) => {
          updateFilter("search", event.target.value);
          updateFilter("page", 1);
        }}
        className="
          h-10
          w-full
          rounded-lg
          border-border
          bg-background
          pl-10
          text-sm
          shadow-sm
          transition-all
          duration-200

          focus-visible:border-ring
          focus-visible:ring-2
          focus-visible:ring-ring/20
        "
      />
    </div>
  );
}
