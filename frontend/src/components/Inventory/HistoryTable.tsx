"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCcw,
} from "lucide-react";

import { StockHistoryItem } from "@/types/stock";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface HistoryTableProps {
  items?: StockHistoryItem[];

  loading?: boolean;
}

export default function HistoryTable({
  items = [],
  loading = false,
}: HistoryTableProps) {
  const getTransactionBadge = (
    type: number
  ) => {
    switch (type) {
      case 1:
        return (
          <Badge className="bg-green-600 hover:bg-green-600">
            <ArrowDownCircle className="mr-1 h-3 w-3" />
            Stock In
          </Badge>
        );

      case 2:
        return (
          <Badge variant="destructive">
            <ArrowUpCircle className="mr-1 h-3 w-3" />
            Stock Out
          </Badge>
        );

      case 3:
        return (
          <Badge className="bg-blue-600 hover:bg-blue-600">
            <RefreshCcw className="mr-1 h-3 w-3" />
            Adjustment
          </Badge>
        );

      default:
        return (
          <Badge variant="secondary">
            Unknown
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({
                length: 8,
              }).map((_, i) => (
                <TableHead key={i}>
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({
              length: 8,
            }).map((_, row) => (
              <TableRow key={row}>
                {Array.from({
                  length: 8,
                }).map((_, col) => (
                  <TableCell key={col}>
                    <div className="h-5 w-full animate-pulse rounded bg-muted" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Product
            </TableHead>

            <TableHead>
              Transaction Type
            </TableHead>

            <TableHead className="text-center">
              Quantity
            </TableHead>

            <TableHead className="text-center">
              Previous Qty
            </TableHead>

            <TableHead className="text-center">
              New Qty
            </TableHead>

            <TableHead>
              Remarks
            </TableHead>

            <TableHead>
              Created By
            </TableHead>

            <TableHead>
              Date
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <TableRow
                key={item.transactionId}
              >
                {/* Product */}

                <TableCell className="font-medium">
                  {item.productName}
                </TableCell>

                {/* Transaction */}

                <TableCell>
                  {getTransactionBadge(
                    item.transactionType
                  )}
                </TableCell>

                {/* Quantity */}

                <TableCell className="text-center font-semibold">
                  {item.quantity}
                </TableCell>

                {/* Previous */}

                <TableCell className="text-center">
                  {item.previousQuantity}
                </TableCell>

                {/* New */}

                <TableCell className="text-center">
                  {item.newQuantity}
                </TableCell>

                {/* Remarks */}

                <TableCell className="max-w-xs truncate">
                  {item.remarks || "-"}
                </TableCell>

                {/* Created By */}

                <TableCell>
                  {item.createdBy}
                </TableCell>

                {/* Date */}

                <TableCell>
                  {new Date(
                    item.createdAt
                  ).toLocaleString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className="py-10 text-center text-muted-foreground"
              >
                No transaction history found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}