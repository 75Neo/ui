import { timer, variantValues } from "@75neo/themes";
import { Timer } from "@75neo/react";

const sizes = variantValues(timer, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function TimerPreview() {
  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Timer size={size} controls={false} startMs={12 * 60 * 1000 + 34 * 1000} />
        </div>
      ))}

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          countdown
        </p>
        <Timer countdown startMs={5 * 60 * 1000} targetMs={0} />
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          labels
        </p>
        <Timer
          units={["hours", "minutes", "seconds"]}
          labels={{ hours: "hrs", minutes: "min", seconds: "sec" }}
          separator="."
        />
      </div>
    </div>
  );
}
