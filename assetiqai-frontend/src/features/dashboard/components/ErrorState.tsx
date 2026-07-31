import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  description?: string;
}

export default function ErrorState({
  title = "Something went wrong",
  description = "Unable to load dashboard data.",
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-white p-10 text-center shadow-sm">
      <AlertTriangle className="mb-4 h-12 w-12 text-red-500" />

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}
