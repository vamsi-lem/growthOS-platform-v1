"use client";

import { useGrowthOS } from "@/context/GrowthOSContext";
import { CodeIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";

/** Developer spec toggle, styled for the dark dock. */
export default function SidebarWidget() {
  const t = useTranslations("growthOs.devSpec");
  const { devSpec, setDevSpec } = useGrowthOS();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={devSpec}
      onClick={() => setDevSpec(!devSpec)}
      className="flex w-full items-center gap-3 rounded-2xl border border-white/10 p-3 text-start transition-colors hover:bg-white/5"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-gray-300">
        <CodeIcon className="size-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-theme-sm font-semibold text-white">{t("title")}</span>
        <span className="block truncate text-theme-xs text-gray-400">{t("desc")}</span>
      </span>
      <span className={cn("relative h-5 w-9 shrink-0 rounded-full transition-colors", devSpec ? "bg-brand-500" : "bg-white/15")}>
        <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-theme-sm transition-all", devSpec ? "start-4.5" : "start-0.5")} />
      </span>
    </button>
  );
}
