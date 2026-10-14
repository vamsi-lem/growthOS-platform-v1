import LeadMemory from "@/components/growth-os/leads/LeadMemory";
import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead memory | Growth OS",
  description: "Every account, scored and with every touch on record.",
};

export default function LeadMemoryPage() {
  return (
    <GrowthPage screen="leads">
      <LeadMemory />
    </GrowthPage>
  );
}
