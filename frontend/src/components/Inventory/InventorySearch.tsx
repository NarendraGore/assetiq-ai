"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface InventorySearchProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function InventorySearch({
  value,
  onValueChange,
}: InventorySearchProps) {
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
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

      <Input
        placeholder="Search inventory..."
        className="pl-10"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />
    </div>
  );
}