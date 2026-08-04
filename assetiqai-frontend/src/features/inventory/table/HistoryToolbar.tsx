"use client";

import { RefreshCw, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { TRANSACTION_TYPE_OPTIONS } from "../constants";
import {
  DATE_RANGE_OPTIONS,
  type DateRangePreset,
} from "../hooks/useHistoryFilters";

interface HistoryToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  transactionType?: number;
  onTransactionTypeChange: (value?: number) => void;

  dateRangePreset: DateRangePreset;
  onDateRangeChange: (value: DateRangePreset) => void;

  hasActiveFilters: boolean;
  onReset: () => void;

  isRefreshing?: boolean;
  onRefresh: () => void;
}

/**
 * Filter bar for the History tab: free-text search, a transaction-type select
 * and a set of date-range preset chips (the "Date Filters" requirement), plus
 * refresh and reset controls.
 */
export default function HistoryToolbar({
  search,
  onSearchChange,
  transactionType,
  onTransactionTypeChange,
  dateRangePreset,
  onDateRangeChange,
  hasActiveFilters,
  onReset,
  isRefreshing = false,
  onRefresh,
}: HistoryToolbarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            placeholder="Search by product or remarks..."
            aria-label="Search transactions"
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={
              transactionType !== undefined ? String(transactionType) : "all"
            }
            onValueChange={(value) =>
              onTransactionTypeChange(
                value === "all" ? undefined : Number(value),
              )
            }
          >
            <SelectTrigger
              aria-label="Filter by transaction type"
              className="min-w-[180px] border-border bg-background"
            >
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>

              {TRANSACTION_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Refresh transactions"
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
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {DATE_RANGE_OPTIONS.map((option) => {
          const isActive = option.value === dateRangePreset;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onDateRangeChange(option.value)}
              aria-pressed={isActive}
              className={
                isActive
                  ? "rounded-full border border-primary bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors"
                  : "rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted"
              }
            >
              {option.label}
            </button>
          );
        })}

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="ml-auto h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
