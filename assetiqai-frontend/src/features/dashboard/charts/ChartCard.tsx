"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChartCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  footer?: ReactNode;
  children: ReactNode;
}

export default function ChartCard({
  title,
  description,
  icon: Icon,
  footer,
  children,
}: ChartCardProps) {
  return (
    <Card className="rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>

            {description && <CardDescription>{description}</CardDescription>}
          </div>

          {Icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="h-[320px]">{children}</CardContent>

      {footer && (
        <CardFooter className="border-t border-border pt-4 text-sm text-muted-foreground">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
