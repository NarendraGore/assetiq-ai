"use client";

interface DashboardHeaderProps {
  title: string;
  description?: string;
}

export default function DashboardHeader({
  title,
  description,
}: DashboardHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h1>

      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}
