"use client";

import TextArea from "@/components/form/input/TextArea";
import Button from "@/components/ui/button/Button";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { PencilIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { TenantId } from "../data";

export default function BriefTab({ tn }: { tn: TenantId }) {
  const t = useTranslations("growthOs");
  const { briefs, role, saveBrief } = useGrowthOS();
  const [draft, setDraft] = useState<string | null>(null);
  const pos = briefs[tn].pos;

  return (
    <div className="space-y-4">
      <p className="text-theme-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">{t("brain.positioning")}</p>
      {draft === null ? (
        <>
          <p className="max-w-3xl text-xl leading-relaxed text-gray-800 dark:text-white/90">{pos}</p>
          {role !== "client" && (
            <Button size="sm" variant="outline" startIcon={<PencilIcon className="size-4" />} onClick={() => setDraft(pos)}>
              {t("brain.edit")}
            </Button>
          )}
        </>
      ) : (
        <>
          <TextArea rows={3} value={draft} onChange={setDraft} className="text-base text-gray-800!" />
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" variant="outline" onClick={() => setDraft(null)}>{t("common.cancel")}</Button>
            <Button
              size="sm"
              onClick={() => {
                saveBrief(tn, draft);
                setDraft(null);
              }}
            >
              {t("brain.save")}
            </Button>
            <span className="text-theme-xs text-gray-500 dark:text-gray-400">{t("brain.saveHint")}</span>
          </div>
        </>
      )}
    </div>
  );
}
