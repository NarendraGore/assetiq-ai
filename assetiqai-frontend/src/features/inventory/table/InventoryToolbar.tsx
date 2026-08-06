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

interface InventoryToolbarProps {
  search: string;

  isRefreshing?: boolean;

  onSearchChange: (value: string) => void;

  onRefresh: () => void;


  onNewTransaction: () => void;
}


export default function InventoryToolbar({
  search,
  isRefreshing = false,
  onSearchChange,
  onRefresh,
  onNewTransaction,
}: InventoryToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          placeholder="Search by product or SKU..."
          aria-label="Search inventory"
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Refresh inventory"
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
          onClick={onNewTransaction}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New transaction
        </Button>
      </div>
    </div>
  );
}
