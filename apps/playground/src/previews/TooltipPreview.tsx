import type { ReactNode } from "react";
import { Button } from "@75neo/react/button";
import { Tooltip } from "@75neo/react/tooltip";
import { tooltipSchema } from "@75neo/themes";

const sizes = tooltipSchema.size.values;
const placements = ["top", "right", "bottom", "left"] as const;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-2";
const rowItems = "flex min-w-0 flex-wrap items-center gap-2";
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

export default function TooltipPreview() {
  return (
    <div className="@container">
      <div className={group}>
        <Row label="sizes">
          {sizes.map((size) => (
            <Tooltip key={size} size={size} text="Copied to the clipboard">
              <Button variant="outline" color="neutral" size="sm">
                {size}
              </Button>
            </Tooltip>
          ))}
        </Row>
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="placement">
          {placements.map((placement) => (
            <Tooltip key={placement} placement={placement} text={placement} arrow>
              <Button variant="outline" color="neutral" size="sm">
                {placement}
              </Button>
            </Tooltip>
          ))}
        </Row>

        <Row label="arrow">
          <Tooltip text="With a triangle" arrow>
            <Button variant="outline" color="neutral" size="sm">
              arrow
            </Button>
          </Tooltip>
        </Row>

        <Row label="disabled">
          <Tooltip text="Never shown" disabled>
            <Button variant="outline" color="neutral" size="sm">
              disabled
            </Button>
          </Tooltip>
        </Row>
      </div>
    </div>
  );
}
