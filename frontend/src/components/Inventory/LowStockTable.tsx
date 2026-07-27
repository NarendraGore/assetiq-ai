"use client";

import {
  AlertTriangle,
} from "lucide-react";

import {
  InventoryItem,
} from "@/types/stock";

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

interface LowStockTableProps {
  items?: InventoryItem[];

  loading?: boolean;
}

export default function LowStockTable({
  items = [],
  loading = false,
}: LowStockTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({
                length: 6,
              }).map((_, i) => (
                <TableHead key={i}>
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({
              length: 5,
            }).map((_, row) => (
              <TableRow key={row}>
                {Array.from({
                  length: 6,
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
              SKU
            </TableHead>

            <TableHead>
              Category
            </TableHead>

            <TableHead>
              Supplier
            </TableHead>

            <TableHead className="text-center">
              Current Stock
            </TableHead>

            <TableHead className="text-center">
              Minimum Stock
            </TableHead>

            <TableHead className="text-right">
              Stock Value
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <TableRow
                key={item.productId}
                className="bg-red-50/30 hover:bg-red-50 dark:bg-red-950/10 dark:hover:bg-red-950/20"
              >
                {/* Product */}

                <TableCell>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />

                    <span className="font-medium">
                      {item.productName}
                    </span>
                  </div>
                </TableCell>

                {/* SKU */}

                <TableCell className="font-mono text-sm">
                  {item.sku}
                </TableCell>

                {/* Category */}

                <TableCell>
                  {item.categoryName}
                </TableCell>

                {/* Supplier */}

                <TableCell>
                  {item.companyName}
                </TableCell>

                {/* Current Stock */}

                <TableCell className="text-center">
                  <Badge variant="destructive">
                    {item.currentStock}
                  </Badge>
                </TableCell>

                {/* Minimum Stock */}

                <TableCell className="text-center">
                  {item.minimumStock}
                </TableCell>

                {/* Stock Value */}

                <TableCell className="text-right font-semibold">
                  ₹
                  {Number(
                    item.stockValue
                  ).toLocaleString("en-IN")}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="py-10 text-center text-muted-foreground"
              >
                No low stock products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}