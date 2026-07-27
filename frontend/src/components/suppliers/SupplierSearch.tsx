"use client";

import { useEffect, useState } from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SupplierSearchProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function SupplierSearch({
  value,
  onValueChange,
}: SupplierSearchProps) {
  const [search, setSearch] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onValueChange(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, onValueChange]);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        placeholder="Search suppliers..."
        className="pl-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}