import type { ReactNode } from "react";
import { FloatingPanel } from "@75neo/react/floating-panel";
import { floatingPanelSchema } from "@75neo/themes";

const sizes = floatingPanelSchema.size.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
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

export default function FloatingPanelPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <FloatingPanel
              size={size}
              title="Notes"
              body="Drag the header, stage the window, pull a corner to resize."
            >
              <button type="button">Open {size}</button>
            </FloatingPanel>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="open">
          <FloatingPanel
            title="Pinned open"
            body="This one starts open, so the panel is on the page."
            defaultOpen
          >
            <button type="button">Toggle</button>
          </FloatingPanel>
        </Row>

        <Row label="close off">
          <FloatingPanel title="No cross" body="Stage buttons only." close={false}>
            <button type="button">Staged</button>
          </FloatingPanel>
        </Row>

        <Row label="fixed">
          <FloatingPanel title="Fixed" body="The panel holds still on scroll." strategy="fixed">
            <button type="button">Fixed</button>
          </FloatingPanel>
        </Row>
      </div>
    </div>
  );
}
