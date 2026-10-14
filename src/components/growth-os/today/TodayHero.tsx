"use client";

import { useGrowthOS } from "@/context/GrowthOSContext";
import { useClientNow } from "@/hooks/useClientNow";
import { useRouter } from "@/i18n/navigation";
import { TimeIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { actions, people, routes, run } from "../data";

/** Full-width emerald banner: who is looking, what needs them now, and how the 09:00 run went. */
export default function TodayHero() {
  const t = useTranslations("growthOs.today");
  const { person, setPerson } = useGrowthOS();
  const router = useRouter();
  const P = people.find((p) => p.id === person) ?? people[0];
  const list = actions[P.id];
  const nNow = list.filter((a) => a.pri === "Now").length;

  // Time-of-day copy is resolved on the client so server and client markup match.
  const now = useClientNow();
  const hour = now?.getHours() ?? 9;
  const greetKey = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
  const date = now?.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  return (
    <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-brand-500 via-brand-600 to-brand-800 p-6 text-white md:p-8">
      <span className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-white/10" aria-hidden />
      <span className="pointer-events-none absolute -bottom-32 end-40 h-64 w-64 rounded-full bg-white/5" aria-hidden />

      <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <div className="flex flex-wrap gap-2" role="tablist">
            {people.map((p) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={p.id === P.id}
                onClick={() => setPerson(p.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full py-1 ps-1 pe-3 text-theme-sm font-medium transition-colors",
                  p.id === P.id ? "bg-white text-brand-700" : "bg-white/10 text-white hover:bg-white/20",
                )}
              >
                <span className={cn("flex h-6 w-6 items-center justify-center rounded-full text-theme-xs", p.id === P.id ? "bg-brand-50" : "bg-white/15")}>{p.initials}</span>
                {p.name}
              </button>
            ))}
          </div>
          <p className="mt-6 text-theme-xs font-medium tracking-wide text-white/70 uppercase">
            {date ? `${date} · ` : ""}{P.role}
          </p>
          <h1 className="mt-2 text-title-sm font-bold md:text-title-md">{t(`greeting.${greetKey}`, { name: P.hello })}.</h1>
          <p className="mt-3 max-w-2xl text-base text-white/80">{t("summary")}</p>
        </div>

        <div className="rounded-2xl bg-white p-5 text-gray-800 shadow-theme-lg lg:col-span-4">
          <p className="text-theme-xs font-medium tracking-wide text-gray-500 uppercase">{t("hero.needsYou")}</p>
          <p className="mt-1 flex items-baseline gap-2">
            <span className="text-title-lg font-bold text-brand-500">{nNow}</span>
            <span className="text-theme-sm text-gray-500">{t("hero.ofToday", { all: list.length })}</span>
          </p>
          <button
            type="button"
            onClick={() => router.push(routes.run)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-theme-sm font-medium text-white hover:bg-brand-600"
          >
            <TimeIcon className="size-5" />
            {t("watch")}
          </button>
        </div>
      </div>

      <div className="relative mt-8 border-t border-white/15 pt-6">
        <p className="mb-4 text-theme-xs font-medium tracking-wide text-white/70 uppercase">{t("runComplete")}</p>
        <ol className="grid grid-cols-3 gap-y-5 sm:grid-cols-6">
          {run.stages.map((st, i) => (
            <li key={st.k} className="relative flex flex-col items-start">
              <span className="flex w-full items-center">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-theme-xs font-semibold text-brand-600">{i + 1}</span>
                {i < run.stages.length - 1 && <span className="mx-2 h-px flex-1 bg-white/30" />}
              </span>
              <span className="mt-2 text-xl font-bold">{st.n}</span>
              <span className="text-theme-xs text-white/75">{st.k} · {st.unit}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
