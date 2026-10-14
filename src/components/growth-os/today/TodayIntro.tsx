"use client";

import { useGrowthOS } from "@/context/GrowthOSContext";
import { useClientNow } from "@/hooks/useClientNow";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { actions, people } from "../data";

/** Typographic page opener: date, greeting, the one-line summary and whose day we are looking at. */
export default function TodayIntro() {
  const t = useTranslations("growthOs.today");
  const { person, setPerson } = useGrowthOS();
  const P = people.find((p) => p.id === person) ?? people[0];
  const list = actions[P.id];
  const nNow = list.filter((a) => a.pri === "Now").length;

  const now = useClientNow();
  const hour = now?.getHours() ?? 9;
  const greetKey = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
  const date = now?.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="flex items-center gap-2 text-theme-sm font-medium text-brand-600 dark:text-brand-400">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          {date ? `${date} · ` : ""}{P.role}
        </p>
        <h1 className="mt-3 text-title-md font-extrabold tracking-tight text-gray-900 md:text-title-lg dark:text-white">
          {t(`greeting.${greetKey}`, { name: P.hello })}.
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
          {t("summary")}{" "}
          <span className="font-semibold text-gray-900 dark:text-white">{t("needYou", { now: nNow })}</span>, {t("today", { all: list.length })}.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1 rounded-full border border-gray-200 bg-white p-1 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900" role="tablist">
        {people.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={p.id === P.id}
            onClick={() => setPerson(p.id)}
            className={cn(
              "flex items-center gap-2 rounded-full py-1 ps-1 pe-3.5 text-theme-sm font-semibold transition-all",
              p.id === P.id ? "bg-brand-500 text-white shadow-md shadow-brand-500/30" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
            )}
          >
            <span className={cn("flex h-7 w-7 items-center justify-center rounded-full text-theme-xs", p.id === P.id ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800")}>{p.initials}</span>
            {p.name}
          </button>
        ))}
      </div>
    </section>
  );
}
