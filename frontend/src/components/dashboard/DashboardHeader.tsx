interface DashboardHeaderProps {
  title?: string;
}

export default function DashboardHeader({
  title = "Dashboard",
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="text-muted-foreground">
          Inventory Overview
        </p>
      </div>
    </div>
  );
}