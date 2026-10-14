"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useGrowthOS } from "@/context/GrowthOSContext";
import { LockIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { accounts, pages } from "../data";
import MetricCard from "../shared/MetricCard";
import { singleTenant, tenantName } from "../utils";
import MeetingSources from "./MeetingSources";

export default function ClientDashboard() {
  const t = useTranslations("growthOs.client");
  const { scope, waves, audit } = useGrowthOS();
  const tn = singleTenant(scope, "mg");
  const cw = waves.filter((w) => w.tn === tn);
  const sent = cw.reduce((a, w) => a + w.sent, 0);
  const rep = cw.reduce((a, w) => a + w.rep, 0);
  const mtg = cw.reduce((a, w) => a + w.mtg, 0);
  const logs = audit.filter((a) => a[3] === tn).slice(0, 6);

  return (
    <>
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 dark:border-gray-800 dark:bg-white/3">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">{t("thisMonth", { tenant: tenantName(tn) })}</h3>
          <p className="mt-1 max-w-3xl text-theme-sm text-gray-500 dark:text-gray-400">{t("desc")}</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-dashed border-gray-300 px-3 py-2 text-theme-xs font-medium text-gray-500 uppercase sm:self-auto dark:border-gray-700 dark:text-gray-400">
          <LockIcon className="size-4" />
          {t("readOnly")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4">
        <MetricCard label={t("kpis.meetings")} value={mtg} sub={t("kpis.meetingsSub")} />
        <MetricCard label={t("kpis.replies")} value={rep} sub={sent ? t("kpis.repliesSub", { rate: ((rep / sent) * 100).toFixed(1), sent }) : t("kpis.noSends")} />
        <MetricCard label={t("kpis.engaged")} value={accounts.filter((a) => a.tn === tn && a.stage !== "Target").length} sub={t("kpis.engagedSub")} />
        <MetricCard label={t("kpis.pages")} value={pages.filter((p) => p.tn === tn).length} sub={t("kpis.pagesSub")} />
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-5">
          <MeetingSources />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <ComponentCard title={t("did")} bodyClassName="p-0">
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {logs.map(([time, who, what], i) => (
                <li key={`${time}-${i}`} className="flex gap-4 px-5 py-4 sm:px-6">
                  <span className="w-12 shrink-0 text-theme-xs font-medium text-gray-400">{time}</span>
                  <span>
                    <span className="block text-theme-sm text-gray-800 dark:text-white/90">{what}</span>
                    <span className="block text-theme-xs text-gray-500 dark:text-gray-400">{who}</span>
                  </span>
                </li>
              ))}
            </ul>
          </ComponentCard>
        </div>
      </div>
    </>
  );
}
