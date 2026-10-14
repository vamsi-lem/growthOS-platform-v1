import AuditLog from "@/components/growth-os/cost/AuditLog";
import SpendVsCap from "@/components/growth-os/cost/SpendVsCap";
import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cost governor & audit log | Growth OS",
  description: "Model spend against each tenant's cap, and every action replayable.",
};

export default function CostAuditPage() {
  return (
    <GrowthPage screen="cost">
      <SpendVsCap />
      <AuditLog />
    </GrowthPage>
  );
}
