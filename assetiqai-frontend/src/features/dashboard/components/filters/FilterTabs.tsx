"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useDashboardFilter } from "../../hooks";

const filters = [
  { label: "Today", value: "today" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
  { label: "Year", value: "year" },
] as const;

export default function FilterTabs() {
  const { filter, setFilter } = useDashboardFilter();

  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex = index;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % filters.length;
        break;

      case "ArrowLeft":
        nextIndex = (index - 1 + filters.length) % filters.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = filters.length - 1;
        break;

      default:
        return;
    }

    e.preventDefault();

    buttonsRef.current[nextIndex]?.focus();

    setFilter(filters[nextIndex].value);
  };

  return (
    <div
      role="tablist"
      aria-label="Dashboard period"
      className="inline-flex rounded-xl border bg-card p-1 shadow-sm"
    >
      {filters.map((item, index) => {
        const active = filter === item.value;

        return (
          <button
            key={item.value}
            ref={(el) => {
              buttonsRef.current[index] = el;
            }}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => setFilter(item.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "relative rounded-lg px-5 py-2 text-sm font-medium transition-all duration-300",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-primary",
              active
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
