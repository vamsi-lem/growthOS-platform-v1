import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import CampaignProgress from "@/components/growth-os/today/CampaignProgress";
import PerformancePulse from "@/components/growth-os/today/PerformancePulse";
import PipelineMix from "@/components/growth-os/today/PipelineMix";
import PriorityBoard from "@/components/growth-os/today/PriorityBoard";
import TodayHero from "@/components/growth-os/today/TodayHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today | Growth OS",
  description: "Top highlights and the actions that need you now.",
};

export default function Today() {
  return (
    <GrowthPage screen="today" hideBreadcrumb>
      <TodayHero />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 2xl:col-span-8">
          <PriorityBoard />
        </div>
        <div className="col-span-12 2xl:col-span-4">
          <PerformancePulse />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-5">
          <PipelineMix />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <CampaignProgress />
        </div>
      </div>
    </GrowthPage>
  );
}
