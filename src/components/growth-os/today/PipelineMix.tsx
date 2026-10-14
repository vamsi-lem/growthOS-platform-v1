"use client";

import type { ApexOptions } from "apexcharts";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { pipeline } from "../data";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

/** This week's pipeline split by source (donut), with each source's growth over eight weeks. */
export default function PipelineMix() {
  const t = useTranslations("growthOs.today");
  const last = pipeline.weeks.length - 1;
  const total = pipeline.series.reduce((a, s) => a + s.v[last], 0);

  const options: ApexOptions = {
    chart: { type: "donut", fontFamily: "Outfit, sans-serif" },
    colors: pipeline.series.map((s) => s.c),
    labels: pipeline.series.map((s) => s.l),
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 3, colors: ["#FFFFFF"] },
    plotOptions: {
      pie: {
        donut: {
          size: "72%",
          labels: {
            show: true,
            name: { show: true, offsetY: 18, color: "#667085", fontSize: "13px" },
            value: { show: true, offsetY: -14, fontSize: "26px", fontWeight: 700, color: "#1D2939", formatter: (v) => `$${v}K` },
            total: { show: true, showAlways: true, label: t("mix.total"), color: "#667085", fontSize: "13px", formatter: () => `$${total}K` },
          },
        },
      },
    },
    tooltip: { y: { formatter: (v) => `$${v}K` } },
  };

  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-white/3">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{t("mix.title")}</h3>
      <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{t("mix.desc", { week: pipeline.weeks[last] })}</p>
      <div className="mt-4 grid grid-cols-1 items-center gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
        <div className="mx-auto w-full max-w-60">
          <ReactApexChart options={options} series={pipeline.series.map((s) => s.v[last])} type="donut" height={240} />
        </div>
        <ul className="space-y-3">
          {pipeline.series.map((s) => {
            const growth = Math.round(((s.v[last] - s.v[0]) / s.v[0]) * 100);
            return (
              <li key={s.l} className="flex items-center gap-3">
                <span className="h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: s.c }} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-theme-sm font-medium text-gray-800 dark:text-white/90">{s.l}</span>
                  <span className="block text-theme-xs text-gray-500 dark:text-gray-400">
                    {t("mix.share", { pct: Math.round((s.v[last] / total) * 100) })} · <span className="text-success-600">+{growth}%</span> {t("mix.growth")}
                  </span>
                </span>
                <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">${s.v[last]}K</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
