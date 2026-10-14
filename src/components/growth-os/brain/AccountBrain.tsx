"use client";

import Badge from "@/components/ui/badge/Badge";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import InfoTooltip from "../shared/InfoTooltip";
import { singleTenant, tenantName } from "../utils";
import BriefProposal from "./BriefProposal";
import BriefTab from "./BriefTab";
import GuardrailsTab from "./GuardrailsTab";
import { IcpTab, PersonasTab, VersionsTab, VoiceTab } from "./ProfileTabs";

type TabKey = "brief" | "icp" | "personas" | "voice" | "guard" | "hist";
const tabKeys: TabKey[] = ["brief", "icp", "personas", "voice", "guard", "hist"];

export default function AccountBrain() {
  const t = useTranslations("growthOs.brain");
  const { scope, briefs } = useGrowthOS();
  const [tab, setTab] = useState<TabKey>("brief");
  const tn = singleTenant(scope, "lg");
  const brief = briefs[tn];

  return (
    <>
      <BriefProposal tn={tn} />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="flex flex-wrap items-start justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white/90">
              {tenantName(tn)}
              <InfoTooltip tip="brain" />
            </h3>
            <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{t("subtitle")}</p>
          </div>
          <Badge color="light">{t("version", { version: brief.v })}</Badge>
        </div>
        <div className="custom-scrollbar mt-5 overflow-x-auto overflow-y-hidden border-b border-gray-200 px-5 sm:px-6 dark:border-gray-800">
          <nav className="-mb-px flex gap-6" role="tablist">
            {tabKeys.map((k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={cn(
                  "border-b-2 pb-3 text-theme-sm font-medium whitespace-nowrap transition-colors",
                  tab === k
                    ? "border-brand-500 text-brand-500 dark:text-brand-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
                )}
              >
                {t(`tabs.${k}`)}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-5 sm:p-6">
          {tab === "brief" && <BriefTab tn={tn} key={tn} />}
          {tab === "icp" && <IcpTab brief={brief} />}
          {tab === "personas" && <PersonasTab brief={brief} />}
          {tab === "voice" && <VoiceTab brief={brief} />}
          {tab === "guard" && <GuardrailsTab tn={tn} />}
          {tab === "hist" && <VersionsTab brief={brief} />}
        </div>
      </div>
    </>
  );
}
