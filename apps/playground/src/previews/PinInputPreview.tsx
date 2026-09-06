import type { ReactNode } from "react";
import { PinInput } from "@75neo/react/pin-input";
import { pinInputSchema } from "@75neo/themes";

const sizes = pinInputSchema.size.values;
const colors = pinInputSchema.color.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-xs";
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

export default function PinInputPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <PinInput size={size} label="Code" defaultValue={["1", "2", "3"]} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <PinInput key={color} color={color} defaultValue={["1", "2", "3"]} />
            ))}
          </div>
        </Row>

        <Row label="length">
          <PinInput length={4} label="Four boxes" />
        </Row>

        <Row label="mask">
          <PinInput mask defaultValue={["1", "2", "3"]} label="Hidden" />
        </Row>
      </div>
    </div>
  );
}
