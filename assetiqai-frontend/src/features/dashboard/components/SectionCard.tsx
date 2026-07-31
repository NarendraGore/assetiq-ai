"use client";

import { ReactNode } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SectionCardProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

export default function SectionCard({
  title,
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
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>

        {action}
      </CardHeader>

      <CardContent className="pt-4">{children}</CardContent>
    </Card>
  );
}
