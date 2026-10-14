import AgentsPanel from "@/components/growth-os/approvals/AgentsPanel";
import ApprovalMetrics from "@/components/growth-os/approvals/ApprovalMetrics";
import ApprovalQueue from "@/components/growth-os/approvals/ApprovalQueue";
import GuardrailAlerts from "@/components/growth-os/approvals/GuardrailAlerts";
import MomentDecision from "@/components/growth-os/approvals/MomentDecision";
import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import PlannedVsDynamic from "@/components/growth-os/approvals/PlannedVsDynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Approvals | Growth OS",
  description: "The human gate: nothing leaves in a client's name until it clears here.",
};

export default function ApprovalsPage() {
  return (
    <GrowthPage screen="cockpit">
      <ApprovalMetrics />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-7 2xl:col-span-8">
          <ApprovalQueue />
        </div>
        <div className="col-span-12 space-y-4 md:space-y-6 xl:col-span-5 2xl:col-span-4">
          <MomentDecision />
          <GuardrailAlerts />
          <AgentsPanel />
          <PlannedVsDynamic />
        </div>
      </div>
    </GrowthPage>
  );
}
