"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProfileInfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  copyable?: boolean;
  badge?: string;
  description?: string;
}

export default function ProfileInfoCard({
  icon: Icon,
  label,
  value,
  copyable = false,
  badge,
  description,
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
    <div
      className="
        group
        relative
        flex
        items-start
        gap-4
        rounded-2xl
        border
        border-border/60
        bg-card/50
        p-4
        backdrop-blur-sm
        shadow-xs
        transition-all
        duration-200
        hover:border-primary/40
        hover:bg-card
        hover:shadow-md
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-primary/10
          text-primary
          transition-all
          duration-200
          group-hover:scale-105
          group-hover:bg-primary
          group-hover:text-primary-foreground
          group-hover:shadow-sm
        "
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          {badge && (
            <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-medium">
              {badge}
            </Badge>
          )}
        </div>

        <p className="mt-1 break-all text-sm font-semibold text-foreground">
          {value || "—"}
        </p>

        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {copyable && value && value !== "—" && value !== "-" && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="
            h-8
            w-8
            shrink-0
            text-muted-foreground
            opacity-0
            transition-all
            duration-200
            hover:bg-muted
            hover:text-foreground
            group-hover:opacity-100
            focus:opacity-100
          "
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
