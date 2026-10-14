"use client";

import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon, CheckCircleIcon, TimeIcon } from "@/icons";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { routes, run, RUN_END } from "../data";
import ProgressBar from "../shared/ProgressBar";
import TenantTag from "../shared/TenantTag";
import { clamp01, tenantName } from "../utils";

/** Replays the 09:00 run: 42 ticks of 420ms simulate five minutes in ~18 seconds. */
export default function BrainRun() {
  const t = useTranslations("growthOs.run");
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setTick((v) => {
        if (v + 1 >= RUN_END) setPlaying(false);
        return Math.min(RUN_END, v + 1);
      });
    }, 420);
    return () => clearInterval(id);
  }, [playing]);

  const finished = tick >= RUN_END;
  const secs = Math.min(298, Math.round((tick / RUN_END) * 298));
  const clock = `09:0${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}`;
  const label = playing ? t("pause") : finished ? t("replay") : tick ? t("resume") : t("play");
  const toggle = () => {
    if (playing) setPlaying(false);
    else {
      if (finished) setTick(0);
      setPlaying(true);
    }
  };
  const logRows = run.log.filter((l) => l[0] <= tick);
  const found = run.found.filter((f) => f.at <= tick);

  return (
    <>
      {/* Control bar */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-white/3">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
          <div className="flex-1">
            <p className="text-theme-xs font-medium tracking-wide text-brand-500 uppercase dark:text-brand-400">{t("eyebrow")}</p>
            <h3 className="mt-1 text-xl font-semibold text-gray-800 dark:text-white/90">{t("headline")}</h3>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-end">
              <p className="text-title-sm font-bold text-gray-800 tabular-nums dark:text-white/90">{clock}</p>
              <p className="text-theme-xs text-gray-500 dark:text-gray-400">{t("simulated")}</p>
            </div>
            <Button size="sm" onClick={toggle} startIcon={<TimeIcon className="size-5" />} className="min-w-36">
              {label}
            </Button>
          </div>
        </div>
        <ProgressBar value={clamp01(tick / RUN_END) * 100} className="mt-5" />
      </div>

      {/* Stages */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        {run.stages.map((st, i) => {
          const next = run.stages[i + 1]?.at ?? RUN_END;
          const done = tick >= next;
          const active = tick >= st.at && !done;
          const idle = tick < st.at;
          const count = idle ? 0 : Math.round(st.n * clamp01((tick - st.at) / 5));
          const fill = done ? 100 : active ? Math.round(clamp01((tick - st.at) / (next - st.at)) * 100) : 0;
          return (
            <div
              key={st.k}
              className={cn(
                "flex flex-col gap-3 rounded-2xl border p-5 transition-all duration-300",
                active && "border-brand-500 bg-white shadow-theme-md ring-4 ring-brand-500/10 dark:bg-gray-900",
                done && "border-brand-200 bg-brand-25 dark:border-brand-800 dark:bg-brand-500/10",
                idle && "border-gray-200 bg-white opacity-60 dark:border-gray-800 dark:bg-white/3",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-theme-xs font-medium text-gray-400">0{i + 1}</span>
                <Badge size="sm" color={done ? "success" : active ? "primary" : "light"}>
                  {done ? t("state.done") : active ? t("state.running") : t("state.waiting")}
                </Badge>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800 dark:text-white/90">{st.k}</p>
                <p className="text-theme-xs font-medium text-brand-500 dark:text-brand-400">{st.agent} · {st.tier}</p>
              </div>
              <p className="flex items-baseline gap-1.5">
                <span className="text-title-sm font-bold text-gray-800 tabular-nums dark:text-white/90">{count}</span>
                <span className="text-theme-xs text-gray-500 dark:text-gray-400">{st.unit}</span>
              </p>
              <ProgressBar value={fill} size="xs" />
              <p className="text-theme-xs text-gray-500 dark:text-gray-400">{st.why}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Live audit log */}
        <div className="col-span-12 overflow-hidden rounded-2xl border border-gray-200 bg-white xl:col-span-7 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6 dark:border-gray-800">
            <h3 className="font-mono text-theme-sm font-medium text-gray-800 dark:text-white/90">{t("log")}</h3>
            <span className="inline-flex items-center gap-2 text-theme-xs text-success-600 dark:text-success-500">
              <span className="h-2 w-2 animate-pulse rounded-full bg-success-500" />
              {t("streaming")}
            </span>
          </div>
          <div className="custom-scrollbar min-h-80 overflow-x-auto bg-gray-50 px-5 py-4 font-mono text-theme-xs sm:px-6 dark:bg-gray-900">
            {logRows.length === 0 && <p className="text-gray-400">{t("waiting")}</p>}
            <ul className="space-y-2">
              {logRows.map((l) => (
                <li key={l[1]} className="grid min-w-120 grid-cols-12 gap-3">
                  <span className="col-span-2 text-gray-400">{l[1]}</span>
                  <span className="col-span-2 font-medium text-brand-500 dark:text-brand-400">{l[2]}</span>
                  <span className="col-span-8 text-gray-700 dark:text-gray-300">{l[3]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accounts found */}
        <div className="col-span-12 rounded-2xl border border-gray-200 bg-white xl:col-span-5 dark:border-gray-800 dark:bg-white/3">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{t("found")}</h3>
            <Badge size="sm">{found.length} / 6</Badge>
          </div>
          <ul className="min-h-80 space-y-3 p-5 sm:p-6">
            {found.map((f) => (
              <li key={f.acct} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">{f.acct}</span>
                  <span className="text-theme-xs text-gray-500 dark:text-gray-400">{f.kind}</span>
                </div>
                <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{f.line}</p>
                <div className="mt-3 flex items-center gap-3">
                  <ProgressBar value={f.score} size="sm" barClassName="bg-success-500" />
                  <span className="text-theme-xs font-semibold text-gray-800 dark:text-white/90">{f.score}</span>
                  <TenantTag tn={f.tn} label={tenantName(f.tn)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {finished && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <div className="rounded-2xl border border-brand-200 bg-brand-25 p-5 dark:border-brand-800 dark:bg-brand-500/10">
            <p className="text-theme-xs font-medium tracking-wide text-brand-500 uppercase dark:text-brand-400">{t("next1Eyebrow")}</p>
            <p className="mt-2 font-semibold text-gray-800 dark:text-white/90">{t("next1Title")}</p>
            <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{t("next1Desc")}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
            <CheckCircleIcon className="size-6 text-brand-500" />
            <p className="mt-2 font-semibold text-gray-800 dark:text-white/90">{t("next2Title")}</p>
            <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{t("next2Desc")}</p>
          </div>
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
            <p className="font-semibold text-gray-800 dark:text-white/90">{t("next3Title")}</p>
            <Link
              href={routes.cockpit}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
            >
              {t("openQueue")}
              <ArrowRightIcon className="size-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
