import { Info } from "lucide-react";
import { tooltip, variantValues } from "@75neo/themes";
import { Button, type Placement, Tooltip } from "@75neo/react";

const sizes = variantValues(tooltip, "size");

const placements: Placement[] = ["top", "right", "bottom", "left"];

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function TooltipPreview() {
  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Tooltip size={size} text={`A bubble at ${size}`} openDelay={0}>
            <Button variant="outline" color="neutral">
              Hover me
            </Button>
          </Tooltip>
        </div>
      ))}

      <hr className="border-muted" />

      {/* The bubble grows from the edge nearest its trigger, which is the positioner's
          own transform origin rather than anything the recipe has to branch on. */}
      <div className={row}>
        <p className={rowLabel} data-identifier>
          placement
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {placements.map((placement) => (
            <Tooltip key={placement} placement={placement} text={placement} arrow openDelay={0}>
              <Button variant="soft" color="neutral">
                {placement}
              </Button>
            </Tooltip>
          ))}
        </div>
      </div>

      <hr className="border-muted" />

      <div className="flex flex-wrap items-center gap-6">
        <Tooltip text="Stays open while the pointer is over it" interactive openDelay={0}>
          <Button variant="ghost" color="neutral" leadingIcon={<Info />}>
            Interactive
          </Button>
        </Tooltip>

        <Tooltip text="Never shown" disabled openDelay={0}>
          <Button variant="ghost" color="neutral">
            Disabled
          </Button>
        </Tooltip>

        {/* `content` takes markup where `text` takes a string. */}
        <Tooltip
          openDelay={0}
          placement="bottom"
          arrow
          content={
            <span className="flex items-center gap-1.5">
              <Info className="size-3.5" />
              Markup, not just a string
            </span>
          }
        >
          <Button variant="ghost" color="neutral">
            Rich content
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
