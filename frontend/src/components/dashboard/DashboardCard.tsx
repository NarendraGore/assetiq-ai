"use client";

import { Card, CardContent } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color?: string;
}

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color,
}: DashboardCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between py-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <Icon className={`h-8 w-8 ${color}`} />
      </CardContent>
    </Card>
  );
}