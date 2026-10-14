"use client";

import { useGrowthOS } from "@/context/GrowthOSContext";
import SignalDetail from "./SignalDetail";
import SignalList from "./SignalList";

export default function SignalDesk() {
  const { signals, selected, inScope } = useGrowthOS();
  const items = signals.filter((x) => inScope(x.tn)).sort((a, b) => b.score - a.score);
  const current = items.find((x) => x.id === selected.signal) ?? items[0];

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 xl:col-span-5">
        <SignalList items={items} selectedId={current?.id} />
      </div>
      <div className="col-span-12 xl:col-span-7">{current && <SignalDetail signal={current} />}</div>
    </div>
  );
}
