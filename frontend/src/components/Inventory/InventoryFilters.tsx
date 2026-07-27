"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InventoryFiltersProps {
  transactionType: string;
  fromDate: string;
  toDate: string;

  onTransactionTypeChange: (
    value: string
  ) => void;

  onFromDateChange: (
    value: string
  ) => void;

  onToDateChange: (
    value: string
  ) => void;
}

export default function InventoryFilters({
  transactionType,
  fromDate,
  toDate,
  onTransactionTypeChange,
  onFromDateChange,
  onToDateChange,
}: InventoryFiltersProps) {
  return (
    <Card>
      <CardContent className="grid gap-5 pt-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label>Transaction Type</Label>

          <Select
            value={transactionType}
            onValueChange={
              onTransactionTypeChange
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All
              </SelectItem>

              <SelectItem value="1">
                Stock In
              </SelectItem>

              <SelectItem value="2">
                Stock Out
              </SelectItem>

              <SelectItem value="3">
                Adjustment
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>From Date</Label>

          <Input
            type="date"
            value={fromDate}
            onChange={(e) =>
              onFromDateChange(
                e.target.value
              )
            }
          />
        </div>

        <div className="space-y-2">
          <Label>To Date</Label>

          <Input
            type="date"
            value={toDate}
            onChange={(e) =>
              onToDateChange(
                e.target.value
              )
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}