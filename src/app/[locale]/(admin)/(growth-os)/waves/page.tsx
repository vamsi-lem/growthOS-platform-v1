import WaveBoard from "@/components/growth-os/waves/WaveBoard";
import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campaign waves | Growth OS",
  description: "The planned 70%: every wave from saved search to CRM.",
};

export default function WaveBoardPage() {
  return (
    <GrowthPage screen="waves">
      <WaveBoard />
    </GrowthPage>
  );
}
