import CampaignPlanner from "@/components/growth-os/campaigns/CampaignPlanner";
import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaigns | Growth OS",
  description: "Planned campaigns: data to audience to channel, with the cadence.",
};

export default function CampaignPlannerPage() {
  return (
    <GrowthPage screen="campaigns">
      <CampaignPlanner />
    </GrowthPage>
  );
}
