"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
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

export default function CategoryPieChart({
  data,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Category Distribution
        </CardTitle>
      </CardHeader>

      <CardContent className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="productCount"
              nameKey="categoryName"
              outerRadius={90}
              label
            />

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}