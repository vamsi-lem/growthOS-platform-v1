import BrainRun from "@/components/growth-os/run/BrainRun";
import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The 09:00 brain run | Growth OS",
  description: "Watch the morning run sense, match, research, draft and gate.",
};

export default function BrainRunPage() {
  return (
    <GrowthPage screen="run">
      <BrainRun />
    </GrowthPage>
  );
}
