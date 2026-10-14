"use client";

import { useTranslations } from "next-intl";
import { pipeline } from "../data";

/** Pipeline as one 100% bar for this week, plus each source's eight-week history as micro columns. */
export default function PipelineComposition() {
  const t = useTranslations("growthOs.today");
  const last = pipeline.weeks.length - 1;
  const total = pipeline.series.reduce((a, s) => a + s.v[last], 0);
  const peak = Math.max(...pipeline.series.flatMap((s) => s.v));

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-7 dark:border-gray-800 dark:bg-white/3">
      <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{t("pipeline")}</h2>
      <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{t("pipelineDesc")}</p>

      <p className="mt-5 flex items-baseline gap-2">
        <span className="text-title-sm font-extrabold tracking-tight text-gray-900 dark:text-white">${total}K</span>
        <span className="text-theme-sm text-gray-500 dark:text-gray-400">{t("mix.total")} · {pipeline.weeks[last]}</span>
      </p>

      <div className="mt-4 flex h-3 overflow-hidden rounded-full" role="img" aria-label={pipeline.series.map((s) => `${s.l} $${s.v[last]}K`).join(", ")}>
        {pipeline.series.map((s) => (
          <span key={s.l} className="h-full first:rounded-s-full last:rounded-e-full" style={{ width: `${(s.v[last] / total) * 100}%`, backgroundColor: s.c }} />
        ))}
      </div>

      <ul className="mt-6 space-y-4">
        {pipeline.series.map((s) => (
          <li key={s.l} className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.c }} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-theme-sm font-semibold text-gray-800 dark:text-white/90">{s.l}</span>
              <span className="block text-theme-xs text-gray-500 dark:text-gray-400">{t("mix.share", { pct: Math.round((s.v[last] / total) * 100) })}</span>
            </span>
            <span className="flex h-7 items-end gap-0.5" aria-hidden>
              {s.v.map((v, i) => (
                <span key={i} className="w-1.5 rounded-sm" style={{ height: `${Math.max(12, (v / peak) * 100)}%`, backgroundColor: s.c, opacity: 0.35 + (i / (s.v.length - 1)) * 0.65 }} />
              ))}
            </span>
            <span className="w-12 text-end text-theme-sm font-bold text-gray-900 tabular-nums dark:text-white">${s.v[last]}K</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
