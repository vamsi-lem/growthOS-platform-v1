import { cn } from "@/utils";
import React from "react";

interface ComponentCardProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: React.ReactNode; // Description text
  action?: React.ReactNode; // Optional header action (button, badge, tabs)
  bodyClassName?: string; // Override the body padding / spacing
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  action,
  bodyClassName,
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3",
        className,
      )}
    >
      {/* Card Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 px-6 py-5">
        <div className="min-w-0">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>
        {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
      </div>

      {/* Card Body */}
      <div
        className={cn(
          "border-t border-gray-100 dark:border-gray-800",
          bodyClassName ?? "p-4 sm:p-6",
        )}
      >
        {bodyClassName ? children : <div className="space-y-6">{children}</div>}
      </div>
    </div>
  );
};

export default ComponentCard;
