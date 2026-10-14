import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import AgendaTimeline from "@/components/growth-os/today/AgendaTimeline";
import CampaignTracks from "@/components/growth-os/today/CampaignTracks";
import PipelineComposition from "@/components/growth-os/today/PipelineComposition";
import RunPanel from "@/components/growth-os/today/RunPanel";
import StatStrip from "@/components/growth-os/today/StatStrip";
import TodayIntro from "@/components/growth-os/today/TodayIntro";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today | Growth OS",
  description: "Top highlights and the actions that need you now.",
};

export default function Today() {
  return (
    <GrowthPage screen="today" hideBreadcrumb>
      <TodayIntro />
      <StatStrip />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-8">
          <AgendaTimeline />
        </div>
        <div className="col-span-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:col-span-4 xl:grid-cols-1 xl:content-start">
          <RunPanel />
          <PipelineComposition />
        </div>
      </div>
      <CampaignTracks />
    </GrowthPage>
  );
}
