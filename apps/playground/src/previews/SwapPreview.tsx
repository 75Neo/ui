import { useState } from "react";
import { swap, variantValues } from "@75neo/themes";
import { Swap } from "@75neo/react";
import { Pause, Play } from "lucide-react";

const sizes = variantValues(swap, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function SwapPreview() {
  const [swapped, setSwapped] = useState(false);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <div className="flex items-center gap-4">
            <Swap size={size} onIcon={<Play />} offIcon={<Pause />} />
            <Swap size={size} swap onIcon={<Play />} offIcon={<Pause />} />
          </div>
        </div>
      ))}

      <hr className="border-muted" />

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="w-fit cursor-pointer text-sm text-primary underline-offset-4 hover:underline"
          onClick={() => setSwapped((previous) => !previous)}
        >
          {swapped ? "Pause it" : "Play it"}
        </button>
        <Swap swap={swapped} onIcon={<Play />} offIcon={<Pause />} />
      </div>
    </div>
  );
}
