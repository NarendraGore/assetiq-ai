"use client";

import {
  MoreHorizontal,
  ArrowDownCircle,
  ArrowUpCircle,
  Pencil,
  Package,
} from "lucide-react";

import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { InventoryItem } from "@/types/stock";

interface InventoryTableProps {
  items?: InventoryItem[];

  loading?: boolean;

  onStockIn: (item: InventoryItem) => void;

  onStockOut: (item: InventoryItem) => void;

  onAdjust: (item: InventoryItem) => void;
}

export default function InventoryTable({
  items = [],
  loading = false,
  onStockIn,
  onStockOut,
  onAdjust,
}: InventoryTableProps) {
  if (loading) {
    return (
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableHead key={i}>
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {Array.from({ length: 8 }).map((_, row) => (
              <TableRow key={row}>
                {Array.from({ length: 10 }).map((_, col) => (
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
            <TableHead>Product</TableHead>

            <TableHead>SKU</TableHead>

            <TableHead>Category</TableHead>

            <TableHead>Supplier</TableHead>

            <TableHead className="text-center">
              Current Stock
            </TableHead>

            <TableHead className="text-center">
              Minimum
            </TableHead>

            <TableHead className="text-right">
              Unit Price
            </TableHead>

            <TableHead className="text-right">
              Stock Value
            </TableHead>

            <TableHead>Status</TableHead>

            <TableHead className="w-16" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <TableRow
                key={item.productId}
                className="hover:bg-muted/40"
              >
                {/* Product */}

                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>

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

                <TableCell className="text-center font-semibold">
                  {item.currentStock}
                </TableCell>

                {/* Minimum */}

                <TableCell className="text-center">
                  {item.minimumStock}
                </TableCell>

                {/* Unit Price */}

                <TableCell className="text-right">
                  ₹
                  {item.unitPrice.toLocaleString(
                    "en-IN"
                  )}
                </TableCell>

                {/* Stock Value */}

                <TableCell className="text-right font-semibold">
                  ₹
                  {item.stockValue.toLocaleString(
                    "en-IN"
                  )}
                </TableCell>

                {/* Status */}

                <TableCell>
                  {item.isLowStock ? (
                    <Badge variant="destructive">
                      Low Stock
                    </Badge>
                  ) : (
                    <Badge className="bg-green-600 hover:bg-green-600">
                      In Stock
                    </Badge>
                  )}
                </TableCell>

                {/* Actions */}

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          onStockIn(item)
                        }
                      >
                        <ArrowDownCircle className="mr-2 h-4 w-4 text-green-600" />
                        Stock In
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          onStockOut(item)
                        }
                      >
                        <ArrowUpCircle className="mr-2 h-4 w-4 text-red-600" />
                        Stock Out
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() =>
                          onAdjust(item)
                        }
                      >
                        <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                        Adjust Stock
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={10}
                className="py-10 text-center text-muted-foreground"
              >
                No inventory found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}