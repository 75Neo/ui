import { useState } from "react";
import { drawer, variantValues } from "@75neo/themes";
import { Button, Drawer } from "@75neo/react";

const placements = variantValues(drawer, "placement");
const sizes = variantValues(drawer, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const body = (
  <>
    <p>
      The header and the footer stay pinned while this scrolls, because the panel hides its own
      overflow and the body takes what height is left.
    </p>
    <p className="mt-3">
      Escape and a click outside close it, the same as a dialog — a drawer is a dialog anchored to
      an edge.
    </p>
  </>
);

const footer = (
  <>
    <Button variant="ghost" color="neutral" size="sm">
      Cancel
    </Button>
    <Button color="primary" size="sm">
      Save changes
    </Button>
  </>
);

export default function DrawerPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="@container flex flex-col gap-6">
      {placements.map((placement) => (
        <div key={placement} className={row}>
          <p className={rowLabel} data-identifier>
            {placement}
          </p>
          <Drawer
            placement={placement}
            title="Notifications"
            description="You are all caught up."
            body={body}
            footer={footer}
          >
            <Button variant="outline" color="neutral" size="sm">
              The {placement} edge
            </Button>
          </Drawer>
        </div>
      ))}

      <hr className="border-muted" />

      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <Drawer
            size={size}
            title="Edit profile"
            description="A width on a side drawer, a height on a top or bottom one."
            body={body}
            footer={footer}
          >
            <Button variant="outline" color="neutral" size="sm">
              The {size} size
            </Button>
          </Drawer>
        </div>
      ))}

      <hr className="border-muted" />

      {/* Nothing but the buttons closes this one: no Escape, no click outside, no ✕. */}
      <div className={row}>
        <p className={rowLabel} data-identifier>
          insistent
        </p>
        <Drawer
          role="alertdialog"
          dismissible={false}
          close={false}
          title="Discard your changes?"
          description="Nothing here is saved yet."
          body={<p>Escape does nothing here and neither does a click outside.</p>}
          footer={footer}
        >
          <Button variant="outline" color="neutral" size="sm">
            Not dismissible
          </Button>
        </Drawer>
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          still
        </p>
        <Drawer
          transition={false}
          overlay={false}
          title="No motion, no overlay"
          description="The panel appears and leaves without animating, over an undimmed page."
          body={
            <p>
              {
                "Turn the transition off where the application already honours prefers-reduced-motion."
              }
            </p>
          }
        >
          <Button variant="outline" color="neutral" size="sm">
            No transition
          </Button>
        </Drawer>
      </div>

      <hr className="border-muted" />

      {/* Controlled: the button outside owns the state, and there is no trigger inside. */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="w-fit cursor-pointer text-sm text-primary underline-offset-4 hover:underline"
          onClick={() => setOpen(true)}
        >
          Open from out here
        </button>
        <Drawer
          open={open}
          onOpenChange={(details) => setOpen(details.open)}
          title="Controlled"
          description="No trigger inside this one; the link above owns the state."
          body={<p>Closing it any way at all reports back through onOpenChange.</p>}
        />
      </div>
    </div>
  );
}
