"use client";

import { useGrowthOS } from "@/context/GrowthOSContext";
import { useRouter } from "@/i18n/navigation";
import type { ApexOptions } from "apexcharts";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { campaigns, routes } from "../data";
import TenantTag from "../shared/TenantTag";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ring = (pct: number): ApexOptions => ({
  chart: { type: "radialBar", sparkline: { enabled: true }, fontFamily: "Outfit, sans-serif" },
  colors: ["#059669"],
  plotOptions: {
    radialBar: {
      hollow: { size: "62%" },
      track: { background: "#ECFDF5" },
      dataLabels: { name: { show: false }, value: { offsetY: 6, fontSize: "18px", fontWeight: 700, color: "#1D2939", formatter: () => `${pct}%` } },
    },
  },
  stroke: { lineCap: "round" },
});

/** Each campaign as a progress ring toward its meeting target. */
export default function CampaignProgress() {
  const t = useTranslations("growthOs.today");
  const { select } = useGrowthOS();
  const router = useRouter();

  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-white/3">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{t("campaigns")}</h3>
      <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{t("progress.desc")}</p>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {campaigns.map((c) => {
          const pct = Math.min(100, Math.round((c.booked / c.target) * 100));
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                select("campaign", c.id);
                router.push(routes.campaigns);
              }}
              className="flex flex-col items-center rounded-xl border border-gray-200 p-4 text-center transition-colors hover:border-brand-300 hover:bg-brand-25 dark:border-gray-800 dark:hover:border-brand-800 dark:hover:bg-brand-500/10"
            >
              <div className="w-28">
                <ReactApexChart options={ring(pct)} series={[pct]} type="radialBar" height={112} />
              </div>
              <span className="mt-2 text-theme-sm font-semibold text-gray-800 dark:text-white/90">{c.name}</span>
              <span className="text-theme-xs text-gray-500 dark:text-gray-400">{c.dates} · {c.st}</span>
              <span className="mt-2 text-theme-xs font-medium text-gray-700 dark:text-gray-300">{t("meetings", { booked: c.booked, target: c.target })}</span>
              <span className="mt-1"><TenantTag tn={c.tn} /></span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
