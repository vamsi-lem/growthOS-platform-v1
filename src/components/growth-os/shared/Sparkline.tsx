"use client";

import { CHART_FONT } from "@/app/fonts";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface SparklineProps {
  data: number[];
  color: string; // hex from the @theme palette
  name: string;
  height?: number;
}

export default function Sparkline({ data, color, name, height = 56 }: SparklineProps) {
  const options: ApexOptions = {
    chart: { type: "area", sparkline: { enabled: true }, fontFamily: CHART_FONT, animations: { enabled: false } },
    colors: [color],
    stroke: { curve: "smooth", width: 2 },
    fill: { type: "gradient", gradient: { opacityFrom: 0.35, opacityTo: 0 } },
    tooltip: { enabled: true, x: { show: false }, marker: { show: false } },
  };

  return <ReactApexChart options={options} series={[{ name, data }]} type="area" height={height} />;
}
