"use client";

import { useEffect, useState } from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { CATEGORY } from "@/constants/category";

interface CategorySearchProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function CategorySearch({
  value,
  onSearch,
}: CategorySearchProps) {
  const [search, setSearch] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(search);
    }, CATEGORY.SEARCH_DEBOUNCE);

    return () => clearTimeout(timer);
  }, [search, onSearch]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

      <Input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search category..."
        className="pl-10"
      />
    </div>
  );
}