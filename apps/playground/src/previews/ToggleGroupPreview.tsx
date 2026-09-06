import type { ReactNode } from "react";
import { ToggleGroup } from "@75neo/react/toggle-group";
import { toggleGroupSchema } from "@75neo/themes";

const variants = toggleGroupSchema.variant.values;
const colors = toggleGroupSchema.color.values;
const sizes = toggleGroupSchema.size.values;

const items = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "min-w-0 max-w-md";
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

export default function ToggleGroupPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {variants.map((variant) => (
          <Row key={variant} label={variant}>
            <ToggleGroup variant={variant} items={items} defaultValue={["week"]} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          <div className="flex flex-col items-start gap-2">
            {colors.map((color) => (
              <ToggleGroup key={color} color={color} items={items} defaultValue={["week"]} />
            ))}
          </div>
        </Row>

        {sizes.map((size) => (
          <Row key={size} label={size}>
            <ToggleGroup size={size} items={items} defaultValue={["week"]} />
          </Row>
        ))}

        <Row label="vertical">
          <ToggleGroup items={items} orientation="vertical" defaultValue={["week"]} />
        </Row>

        <Row label="multiple">
          <ToggleGroup items={items} multiple defaultValue={["day", "month"]} />
        </Row>
      </div>
    </div>
  );
}
