"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

interface ProductSearchProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function ProductSearch({
  value,
  onValueChange,
}: ProductSearchProps) {
  const [search, setSearch] = useState(value);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

      <Input
        placeholder="Search products..."
        value={search}
        onChange={(e) => {
          const nextValue = e.target.value;
          setSearch(nextValue);
          onValueChange(nextValue);
        }}
        className="pl-10"
      />
    </div>
  );
}