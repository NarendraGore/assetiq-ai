"use client";

import { useLowStock } from "@/hooks/useDashboard";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

export default function LowStockTable() {
  const { data = [], isLoading } =
    useLowStock();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Low Stock Products
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Current</TableHead>
              <TableHead>Minimum</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5}>
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              data.map((item: any) => (
                <TableRow
                  key={item.productId}
                >
                  <TableCell>
                    {item.productName}
                  </TableCell>

                  <TableCell>
                    {item.sku}
                  </TableCell>

                  <TableCell>
                    {item.currentStock}
                  </TableCell>

                  <TableCell>
                    {item.minimumStock}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="destructive"
                    >
                      Low
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}