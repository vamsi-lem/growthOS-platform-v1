"use client";

import { cn } from "@/utils";

export interface SegmentOption<T extends string> {
  value: T;
  label: React.ReactNode;
}

interface SegmentedTabsProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  ariaLabel?: string;
}

/** Segmented switch in the template's ChartTab style, driven by props. */
export default function SegmentedTabs<T extends string>({ options, value, onChange, className, ariaLabel }: SegmentedTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn("flex flex-wrap items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900", className)}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-theme-sm font-medium whitespace-nowrap hover:text-gray-900 dark:hover:text-white",
            value === o.value
              ? "bg-white text-gray-900 shadow-theme-xs dark:bg-gray-800 dark:text-white"
              : "text-gray-500 dark:text-gray-400",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
