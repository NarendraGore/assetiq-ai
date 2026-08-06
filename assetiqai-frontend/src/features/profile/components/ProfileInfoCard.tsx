"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface ProfileInfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  copyable?: boolean;
}

export default function ProfileInfoCard({
  icon: Icon,
  label,
  value,
  copyable = false,
}: ProfileInfoCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value || value === "—" || value === "-") return;

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`Copied ${label} to clipboard`);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="truncate text-sm font-medium text-foreground">
            {value || "—"}
          </p>
        </div>
      </div>

      {copyable && value && value !== "—" && value !== "-" && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-muted hover:text-foreground"
          title={`Copy ${label}`}
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
}
