"use client";

import { Plus, RefreshCw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SupplierToolbarProps {
  search: string;

  isRefreshing?: boolean;

  onSearchChange: (value: string) => void;

  onRefresh: () => void;

  onAddSupplier: () => void;
}

export default function SupplierToolbar({
  search,
  isRefreshing = false,

  onSearchChange,

  onRefresh,

  onAddSupplier,
}: SupplierToolbarProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div className="relative w-full max-w-md">
        <Search
          className="
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
          value={search}
          placeholder="Search suppliers..."
          aria-label="Search suppliers"
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            pl-10
            transition-all
            duration-200
            focus-visible:ring-2
            focus-visible:ring-ring
          "
        />
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Refresh suppliers"
                onClick={onRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </Button>
            </TooltipTrigger>

            <TooltipContent>Refresh</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          onClick={onAddSupplier}
          className="
            bg-primary
            hover:bg-primary/90
            text-primary-foreground
            gap-2
          "
        >
          <Plus className="h-4 w-4" />
          Add Supplier
        </Button>
      </div>
    </div>
  );
}
