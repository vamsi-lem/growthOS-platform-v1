"use client";

import Button from "@/components/ui/button/Button";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { ShootingStarIcon } from "@/icons";
import { useTranslations } from "next-intl";
import type { TenantId } from "../data";

/** Nightly analyst proposal for the next brief version, waiting for a human. */
export default function BriefProposal({ tn }: { tn: TenantId }) {
  const t = useTranslations("growthOs.brain");
  const { queue, approve } = useGrowthOS();
  const prop = queue.find((q) => q.type === "Brief v+1" && q.tn === tn && q.st === "pending");
  if (!prop) return null;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-brand-300 bg-brand-25 p-5 sm:flex-row sm:items-center dark:border-brand-800 dark:bg-brand-500/10">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
        <ShootingStarIcon className="size-5" />
      </span>
      <div className="flex-1">
        <p className="text-theme-xs font-medium tracking-wide text-brand-500 uppercase dark:text-brand-400">{t("proposal")}</p>
        <p className="mt-1 font-semibold text-gray-800 dark:text-white/90">{prop.title}</p>
        <p className="text-theme-sm text-gray-500 dark:text-gray-400">{prop.detail}</p>
      </div>
      <Button size="sm" onClick={() => approve(prop.id)}>{t("approveProposal")}</Button>
    </div>
  );
}
