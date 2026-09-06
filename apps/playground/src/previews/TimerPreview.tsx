import type { ReactNode } from "react";
import { Timer } from "@75neo/react/timer";
import { timerSchema } from "@75neo/themes";

const sizes = timerSchema.size.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-start gap-6";
const group = "flex flex-col gap-5";
const rule = "border-muted my-6";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={row}>
      <p className={rowLabel} data-identifier>
        {label}
      </p>
      <div className={rowItems}>{children}</div>
    </div>
  );
}

export default function TimerPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Timer size={size} targetMs={90_000} countdown />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="units">
          <Timer units={["hours", "minutes", "seconds"]} startMs={3_600_000} />
        </Row>

        <Row label="labels">
          <Timer labels={{ minutes: "min", seconds: "sec" }} />
        </Row>

        <Row label="bare">
          <Timer showLabels={false} controls={false} autoStart />
        </Row>
      </div>
    </div>
  );
}
