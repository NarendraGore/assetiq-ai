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

interface CategoryToolbarProps {
  search: string;

  isRefreshing?: boolean;

  onSearchChange: (value: string) => void;

  onRefresh: () => void;

  onAddCategory: () => void;
}

export default function CategoryToolbar({
  search,
  isRefreshing = false,

  onSearchChange,

  onRefresh,

  onAddCategory,
}: CategoryToolbarProps) {
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
          placeholder="Search categories..."
          aria-label="Search categories"
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            pl-10
            transition-all
            duration-200
            focus-visible:ring-2
            focus-visible:ring-blue-500
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
          onClick={onAddCategory}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            gap-2
          "
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>
    </div>
  );
}
