import type { ReactNode } from "react";
import { Drawer } from "@75neo/react/drawer";
import { drawerSchema } from "@75neo/themes";

const sizes = drawerSchema.size.values;
const placements = drawerSchema.placement.values;

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

export default function DrawerPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Drawer
              size={size}
              title="Settings"
              description="Tune the workspace."
              body="Every control lives in the panel, so the page behind stays put."
            >
              <button type="button">Open {size}</button>
            </Drawer>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="placements">
          {placements.map((placement) => (
            <Drawer
              key={placement}
              placement={placement}
              title={placement}
              body="The panel docks to this edge."
            >
              <button type="button">{placement}</button>
            </Drawer>
          ))}
        </Row>

        <Row label="close off">
          <Drawer
            title="Must choose"
            body="Answer through the footer."
            close={false}
            footer="Answer"
          >
            <button type="button">Choose</button>
          </Drawer>
        </Row>
      </div>
    </div>
  );
}
