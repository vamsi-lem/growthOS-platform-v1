import { cn } from "@/utils";

interface ProgressBarProps {
  value: number; // 0–100
  className?: string;
  barClassName?: string;
  color?: string; // optional chart hex for data-driven series
  size?: "xs" | "sm" | "md" | "lg";
}

const heights = { xs: "h-1", sm: "h-1.5", md: "h-2", lg: "h-3" };

export default function ProgressBar({ value, className, barClassName, color, size = "md" }: ProgressBarProps) {
  return (
    <div className={cn("w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800", heights[size], className)}>
      <div
        className={cn("h-full rounded-full bg-brand-500 transition-all duration-300", barClassName)}
        style={{ width: `${Math.max(0, Math.min(100, value))}%`, ...(color ? { backgroundColor: color } : {}) }}
      />
    </div>
  );
}
