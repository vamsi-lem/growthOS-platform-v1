"use client";

import { useRouter } from "@/i18n/navigation";
import { CheckLineIcon, TimeIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { routes, run } from "../data";
import InfoTooltip from "../shared/InfoTooltip";

/** Dark tile summarising the 09:00 run as a completed vertical checklist. */
export default function RunPanel() {
  const t = useTranslations("growthOs.today");
  const router = useRouter();
  const max = Math.max(...run.stages.map((s) => s.n));

  return (
    <section className="rounded-3xl bg-gray-950 p-6 text-white md:p-7">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/15 px-3 py-1 text-theme-xs font-semibold text-brand-300">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
          {t("runComplete")}
        </span>
        <InfoTooltip tip="run" align="end" />
      </div>

      <ol className="mt-6 space-y-3.5">
        {run.stages.map((st) => (
          <li key={st.k} className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
              <CheckLineIcon className="size-3.5" />
            </span>
            <span className="w-20 shrink-0 text-theme-sm font-semibold">{st.k}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full rounded-full bg-brand-500" style={{ width: `${Math.max(8, (st.n / max) * 100)}%` }} />
            </span>
            <span className="w-8 text-end text-theme-sm font-bold tabular-nums">{st.n}</span>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={() => router.push(routes.run)}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-theme-sm font-semibold text-gray-950 transition-colors hover:bg-brand-50"
      >
        <TimeIcon className="size-4" />
        {t("watch")}
      </button>
    </section>
  );
}
