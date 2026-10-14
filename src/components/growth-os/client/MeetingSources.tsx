"use client";

import ComponentCard from "@/components/common/ComponentCard";
import type { ApexOptions } from "apexcharts";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { meetingSources } from "../data";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MeetingSources() {
  const t = useTranslations("growthOs.client");

  const options: ApexOptions = {
    chart: { type: "bar", height: 260, fontFamily: "Outfit, sans-serif", toolbar: { show: false } },
    colors: ["#059669"],
    plotOptions: { bar: { horizontal: true, borderRadius: 5, barHeight: "48%" } },
    dataLabels: { enabled: true, formatter: (v) => `${v}%`, style: { fontSize: "12px", fontWeight: 600 }, offsetX: 6 },
    grid: { borderColor: "#E4E7EC", strokeDashArray: 3, yaxis: { lines: { show: false } } },
    xaxis: { categories: meetingSources.map((s) => s[0]), max: 50, labels: { formatter: (v) => `${v}%`, style: { colors: "#667085" } }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { style: { colors: ["#667085"], fontSize: "13px" } } },
    tooltip: { y: { formatter: (v) => `${v}%` } },
  };

  return (
    <ComponentCard title={t("sources")} desc={t("sourcesDesc")} bodyClassName="px-2 pt-2 pb-0 sm:px-4">
      <ReactApexChart options={options} series={[{ name: t("sources"), data: meetingSources.map((s) => s[1]) }]} type="bar" height={260} />
    </ComponentCard>
  );
}
