import type { ReactNode } from "react";
import { Toggle } from "@75neo/react/toggle";
import { toggleSchema } from "@75neo/themes";

const variants = toggleSchema.variant.values;
const colors = toggleSchema.color.values;
const sizes = toggleSchema.size.values;

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

export default function TogglePreview() {
  return (
    <div className="@container">
      <div className={group}>
        {variants.map((variant) => (
          <Row key={variant} label={variant}>
            <Toggle variant={variant} defaultPressed>
              {variant}
            </Toggle>
            <Toggle variant={variant}>{variant}</Toggle>
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          {colors.map((color) => (
            <Toggle key={color} color={color} defaultPressed>
              {color}
            </Toggle>
          ))}
        </Row>

        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Toggle size={size} defaultPressed>
              Save
            </Toggle>
          </Row>
        ))}

        <Row label="disabled">
          <Toggle disabled>Save</Toggle>
        </Row>
      </div>
    </div>
  );
}
