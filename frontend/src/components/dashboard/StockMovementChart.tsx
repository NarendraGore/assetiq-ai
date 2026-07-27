"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  data: unknown[];
}

export default function StockMovementChart({
  data,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Stock In vs Stock Out
        </CardTitle>
      </CardHeader>

      <CardContent className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="stockIn"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="stockOut"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}