import type { ReactNode } from "react";
import { NumberInput } from "@75neo/react/number-input";
import { numberInputSchema } from "@75neo/themes";

const sizes = numberInputSchema.size.values;
const colors = numberInputSchema.color.values;

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

export default function NumberInputPreview() {
  return (
    <div className="@container">
      <div className={group}>
        <Row label="orientations">
          <NumberInput defaultValue="4" label="Quantity" />
        </Row>
        <Row label="vertical">
          <NumberInput defaultValue="4" orientation="vertical" label="Quantity" />
        </Row>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <NumberInput size={size} defaultValue="4" />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <NumberInput key={color} color={color} defaultValue="4" />
            ))}
          </div>
        </Row>

        <Row label="bounds">
          <NumberInput defaultValue="4" min={0} max={10} label="0 to 10" />
        </Row>

        <Row label="disabled">
          <NumberInput defaultValue="4" disabled />
        </Row>
      </div>
    </div>
  );
}
