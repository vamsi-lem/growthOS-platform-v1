"use client";

import { InfoIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { type TipKey, tips } from "../data";

interface InfoTooltipProps {
  tip: TipKey;
  className?: string;
  label?: string; // optional visible label (e.g. "SEO")
  align?: "start" | "end";
}

/** "How and why" explainer: hover or focus shows what a concept is, why it matters and its steps. */
export default function InfoTooltip({ tip, className, label, align = "start" }: InfoTooltipProps) {
  const t = useTranslations("growthOs.tip");
  const [open, setOpen] = useState(false);
  const T = tips[tip];

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={`${t("open")}: ${T.t}`}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-1 text-gray-400 transition-colors hover:text-brand-500 dark:text-gray-500 dark:hover:text-brand-400",
          label && "rounded-lg border border-gray-300 px-2 py-1 dark:border-gray-700 text-theme-xs font-medium",
        )}
      >
        {label}
        <InfoIcon className="size-4" />
      </button>
      {open && (
        <span
          role="tooltip"
          className={cn(
            "absolute top-full z-999 mt-2 block w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-gray-200 bg-white text-start shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark",
            align === "end" ? "inset-e-0" : "inset-s-0",
          )}
        >
          <span className="block bg-brand-500 px-4 py-3 text-white">
            <span className="block text-theme-xs font-medium tracking-wide text-white/70 uppercase">{t("howWhy")}</span>
            <span className="mt-0.5 block text-sm font-semibold">{T.t}</span>
          </span>
          <span className="block space-y-3 p-4">
            <span className="block text-theme-sm text-gray-700 dark:text-gray-300">{T.w}</span>
            <span className="block rounded-lg bg-gray-50 px-3 py-2 text-theme-xs text-gray-600 dark:bg-white/3 dark:text-gray-400">
              <span className="font-semibold text-gray-800 dark:text-white/90">{t("why")} · </span>
              {T.y}
            </span>
            <span className="block space-y-1.5">
              {T.h.map((step, i) => (
                <span key={step} className="flex items-center gap-2.5 text-theme-xs text-gray-600 dark:text-gray-400">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-theme-xs font-semibold text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">
                    {i + 1}
                  </span>
                  {step}
                </span>
              ))}
            </span>
          </span>
        </span>
      )}
    </span>
  );
}
