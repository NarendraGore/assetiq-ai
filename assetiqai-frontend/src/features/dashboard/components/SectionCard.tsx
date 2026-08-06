"use client";

import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardProps {
  title: string;

  description?: string;
  children: ReactNode;
  action?: ReactNode;
}

export default function SectionCard({
  title,
  description,
  children,
  action,
}: SectionCardProps) {
  return (
    <Card
      className="
        rounded-2xl
        border
        border-border
        bg-card
        text-card-foreground
        shadow-sm
      "
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>

            {description && <CardDescription>{description}</CardDescription>}
          </div>

          {action}
        </div>
      </CardHeader>

      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}
