import { popover, variantValues } from "@75neo/themes";
import { Button, type Placement, Popover } from "@75neo/react";

const sizes = variantValues(popover, "size");

const placements: Placement[] = ["top", "right", "bottom", "left"];

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

export default function PopoverPreview() {
  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Popover
            size={size}
            title="Notifications"
            description="Where the noisy ones go."
            body="Everything in this panel is addressed by name rather than handed in as markup."
          >
            <Button variant="outline" color="neutral">
              Open ({size})
            </Button>
          </Popover>
        </div>
      ))}

      <hr className="border-muted" />

      {/* The panel grows from the edge nearest its trigger, which is the positioner's
          own transform origin rather than anything the recipe branches on. */}
      <div className={row}>
        <p className={rowLabel} data-identifier>
          placement
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {placements.map((placement) => (
            <Popover
              key={placement}
              placement={placement}
              arrow
              body={`Anchored to the ${placement} of its trigger.`}
            >
              <Button variant="soft" color="neutral">
                {placement}
              </Button>
            </Popover>
          ))}
        </div>
      </div>

      <hr className="border-muted" />

      <div className="flex flex-wrap items-center gap-3">
        <Popover
          title="With a close button"
          description="The title keeps out of its way on its own."
          close
        >
          <Button variant="ghost" color="neutral">
            Closable
          </Button>
        </Popover>

        <Popover title="Modal" body="Focus is trapped and the page behind it is inert." modal close>
          <Button variant="ghost" color="neutral">
            Modal
          </Button>
        </Popover>

        <Popover
          title="Stays put"
          body="Escape and a click outside are both off, so the close button is the only way out."
          dismissible={false}
          close
        >
          <Button variant="ghost" color="neutral">
            Not dismissible
          </Button>
        </Popover>
      </div>
    </div>
  );
}
