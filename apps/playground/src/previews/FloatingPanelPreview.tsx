import { useState } from "react";
import { floatingPanel, variantValues } from "@75neo/themes";
import { Button, FloatingPanel } from "@75neo/react";

const sizes = variantValues(floatingPanel, "size");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:items-center @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const body = (
  <>
    <p>Drag the header to move this panel, and pull any edge or corner to resize it.</p>
    <p className="mt-3">
      The page stays usable around it — a floating panel never takes the page modal.
    </p>
  </>
);

export default function FloatingPanelPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <FloatingPanel size={size} title="Floating panel" body={body}>
            <Button variant="outline" color="neutral" size="sm">
              The {size} size
            </Button>
          </FloatingPanel>
        </div>
      ))}

      <hr className="border-muted" />

      <div className={row}>
        <p className={rowLabel} data-identifier>
          minimal
        </p>
        <FloatingPanel
          title="No chrome to spare"
          stages={["minimized", "default"]}
          body={<p>Only minimize and restore — nothing here maximizes.</p>}
        >
          <Button variant="outline" color="neutral" size="sm">
            Fewer stages
          </Button>
        </FloatingPanel>
      </div>

      <div className={row}>
        <p className={rowLabel} data-identifier>
          fixed
        </p>
        <FloatingPanel
          title="Hands off"
          draggable={false}
          resizable={false}
          body={<p>Neither the header drags nor the edges resize on this one.</p>}
        >
          <Button variant="outline" color="neutral" size="sm">
            Locked in place
          </Button>
        </FloatingPanel>
      </div>

      <hr className="border-muted" />

      {/* Controlled: the button outside owns the state, and there is no trigger inside. */}
      <div className="flex flex-col gap-2">
        <Button variant="outline" color="neutral" size="sm" onClick={() => setOpen(true)}>
          Open from out here
        </Button>
        <FloatingPanel
          open={open}
          onOpenChange={(details) => setOpen(details.open)}
          title="Controlled"
          body={<p>Closing it any way at all reports back through onOpenChange.</p>}
        />
      </div>
    </div>
  );
}
