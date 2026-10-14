"use client";

import Button from "@/components/ui/button/Button";
import { PaperPlaneIcon } from "@/icons";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { type Campaign, CAMPAIGN_END, CAMPAIGN_PHASE as PHASE } from "../data";
import ProgressBar from "../shared/ProgressBar";
import TenantTag from "../shared/TenantTag";
import { clamp01 } from "../utils";
import CadenceTable from "./CadenceTable";
import CampaignFlow from "./CampaignFlow";

/** One campaign: header with the launch simulation, the flow and the cadence. Remounted per campaign. */
export default function CampaignBoard({ campaign: C }: { campaign: Campaign }) {
  const t = useTranslations("growthOs.campaigns");
  const live = C.st === "Live";
  const [tick, setTick] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setTick((v) => {
        if (v + 1 >= CAMPAIGN_END) setPlaying(false);
        return Math.min(CAMPAIGN_END, v + 1);
      });
    }, 420);
    return () => clearInterval(id);
  }, [playing]);

  const cadenceOn = tick >= PHASE.cadence || live;
  const progress = clamp01((tick - PHASE.cadence) / 14);
  const booked = live ? C.booked : cadenceOn ? Math.round(C.sim.booked * progress) : 0;
  const replies = live ? Math.round(C.sim.replies * 0.6) : cadenceOn ? Math.round(C.sim.replies * progress) : 0;
  const cols = C.days.length;
  const activeCol = live ? 2 : cadenceOn ? Math.min(cols - 1, Math.floor((tick - PHASE.cadence) / (14 / cols))) : -1;

  const phase = live
    ? t("phase.live")
    : tick === 0
      ? t("phase.notLaunched")
      : tick < PHASE.gates
        ? t("phase.pulling", { tool: C.source.tool })
        : tick < PHASE.branches
          ? t("phase.gates")
          : tick < PHASE.cadence
            ? t("phase.splitting")
            : tick < CAMPAIGN_END
              ? t("phase.cadence", { day: C.days[Math.max(0, activeCol)] })
              : t("phase.outcome");
  const label = playing ? t("pause") : tick >= CAMPAIGN_END ? t("replay") : tick ? t("resume") : t("simulate");

  return (
    <>
      <div className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between dark:border-gray-800 dark:bg-white/3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <TenantTag tn={C.tn} />
            <span className="text-theme-xs text-gray-500 dark:text-gray-400">
              · {t("owner", { owner: C.owner, status: C.st })}
            </span>
          </div>
          <h3 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white/90">{C.name} · {C.dates}</h3>
          <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">{C.goal}</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="min-w-52">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-theme-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t("meetings")}</span>
              <span className="text-2xl font-bold text-success-600 dark:text-success-500">
                {booked}<span className="text-sm font-medium text-gray-400"> / {C.target}</span>
              </span>
            </div>
            <ProgressBar value={(booked / C.target) * 100} className="mt-2" barClassName="bg-success-500" />
            <p className="mt-1.5 text-theme-xs text-gray-500 dark:text-gray-400">{t("replies", { count: replies })}</p>
          </div>
          {!live && (
            <Button
              size="sm"
              startIcon={<PaperPlaneIcon className="size-5" />}
              onClick={() => {
                if (playing) setPlaying(false);
                else {
                  if (tick >= CAMPAIGN_END) setTick(0);
                  setPlaying(true);
                }
              }}
            >
              {label}
            </Button>
          )}
        </div>
      </div>

      <CampaignFlow campaign={C} tick={tick} live={live} booked={booked} phase={phase} />
      <CadenceTable campaign={C} activeCol={activeCol} simulated={tick > 0 && !live} />
    </>
  );
}
