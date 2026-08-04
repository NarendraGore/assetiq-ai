"use client";

import { memo } from "react";
import type { LucideIcon } from "lucide-react";
import { TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  /**
   * Background utility for the icon tile. These stay fixed saturated hues in
   * both themes on purpose — they are categorical accents (like chart series),
   * not surfaces, so flipping them with the theme would lose the colour coding.
   * The white glyph keeps AA contrast against every value used.
   */
  color?: string;
  subtitle?: string;
}

function SummaryCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-600",
  subtitle = "Inventory Overview",
}: SummaryCardProps) {
  return (
    <Card
      className={cn(
        "group overflow-hidden rounded-2xl",
        "border border-border",
        "bg-card",
        "shadow-sm transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg",
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {value}
            </h2>

            <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" />
              <span>{subtitle}</span>
            </div>
          </div>

          <div
            className={cn(
              "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl",
              "shadow-sm transition-transform duration-300",
              "group-hover:scale-110",
              color,
            )}
          >
            <Icon className="h-8 w-8 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(SummaryCard);
