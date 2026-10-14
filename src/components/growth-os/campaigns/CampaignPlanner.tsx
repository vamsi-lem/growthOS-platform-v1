"use client";

import { useGrowthOS } from "@/context/GrowthOSContext";
import { campaigns } from "../data";
import SegmentedTabs from "../shared/SegmentedTabs";
import CampaignBoard from "./CampaignBoard";

export default function CampaignPlanner() {
  const { selected, select } = useGrowthOS();
  const C = campaigns.find((c) => c.id === selected.campaign) ?? campaigns[0];

  return (
    <>
      <SegmentedTabs
        className="self-start"
        value={C.id}
        onChange={(id) => select("campaign", id)}
        options={campaigns.map((c) => ({
          value: c.id,
          label: (
            <>
              {c.name}
              <span className="hidden text-theme-xs text-gray-400 sm:inline">{c.dates}</span>
            </>
          ),
        }))}
      />
      <CampaignBoard key={C.id} campaign={C} />
    </>
  );
}
