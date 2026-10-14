import AccountBrain from "@/components/growth-os/brain/AccountBrain";
import GrowthPage from "@/components/growth-os/shared/GrowthPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Brain | Growth OS",
  description: "The versioned brief every agent reads before every job.",
};

export default function AccountBrainPage() {
  return (
    <GrowthPage screen="brain">
      <AccountBrain />
    </GrowthPage>
  );
}
