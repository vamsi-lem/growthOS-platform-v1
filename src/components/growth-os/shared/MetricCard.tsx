import Badge from "@/components/ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon } from "@/icons";
import { cn } from "@/utils";
import type { Tone } from "../data";

interface MetricCardProps {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  delta?: { text: string; up: boolean };
  valueTone?: Tone | "default";
  children?: React.ReactNode; // e.g. a sparkline
}

const valueColors: Record<Tone | "default", string> = {
  default: "text-gray-800 dark:text-white/90",
  primary: "text-brand-500 dark:text-brand-400",
  error: "text-error-600 dark:text-error-500",
  success: "text-success-600 dark:text-success-500",
  warning: "text-warning-600 dark:text-orange-400",
  light: "text-gray-800 dark:text-white/90",
};

/** KPI tile in the template's EcommerceMetrics style. */
export default function MetricCard({ label, value, sub, delta, valueTone = "default", children }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 dark:border-gray-800 dark:bg-white/3">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
        <h4 className={cn("text-title-sm font-bold", valueColors[valueTone])}>{value}</h4>
        {delta && (
          <Badge color={delta.up ? "success" : "error"} size="sm">
            {delta.up ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {delta.text}
          </Badge>
        )}
      </div>
      {sub && <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{sub}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
