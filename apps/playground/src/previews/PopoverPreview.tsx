import type { ReactNode } from "react";
import { Popover } from "@75neo/react/popover";
import { popoverSchema } from "@75neo/themes";

const sizes = popoverSchema.size.values;

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

export default function PopoverPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Popover
              size={size}
              title="About this row"
              description="A quieter line under the heading."
              body="The panel's main content sits under both."
            >
              <button type="button">Open {size}</button>
            </Popover>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="arrow">
          <Popover title="Pointing back" body="The triangle aims at the trigger." arrow>
            <button type="button">Aimed</button>
          </Popover>
        </Row>

        <Row label="close">
          <Popover title="Dismissable" body="The cross closes the panel." close>
            <button type="button">Closable</button>
          </Popover>
        </Row>

        <Row label="placement">
          <Popover title="On top" body="The panel prefers the top edge." placement="top">
            <button type="button">Above</button>
          </Popover>
        </Row>
      </div>
    </div>
  );
}
