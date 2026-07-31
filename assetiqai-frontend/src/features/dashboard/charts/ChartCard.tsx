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
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">{title}</CardTitle>

            {description && <CardDescription>{description}</CardDescription>}
          </div>

          {Icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="h-[320px]">{children}</CardContent>

      {footer && (
        <CardFooter className="border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
