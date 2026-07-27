"use client";

import { useRecentTransactions } from "@/hooks/useDashboard";

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

export default function RecentTransactionsTable() {
  const { data = [], isLoading } =
    useRecentTransactions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Recent Transactions
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Date</TableHead>
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
                  key={item.transactionId}
                >
                  <TableCell>
                    {item.productName}
                  </TableCell>

                  <TableCell>
                    {item.transactionType === 1
                      ? "Stock In"
                      : "Stock Out"}
                  </TableCell>

                  <TableCell>
                    {item.quantity}
                  </TableCell>

                  <TableCell>
                    {item.createdBy}
                  </TableCell>

                  <TableCell>
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}