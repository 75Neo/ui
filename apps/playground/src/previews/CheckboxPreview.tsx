import type { ReactNode } from "react";
import { Checkbox } from "@75neo/react/checkbox";
import { checkboxSchema } from "@75neo/themes";

const sizes = checkboxSchema.size.values;
const colors = checkboxSchema.color.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-col gap-2";
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

export default function CheckboxPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Checkbox size={size} label="Notifications" description="Email me about mentions." />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          {colors.map((color) => (
            <Checkbox key={color} color={color} label={color} defaultChecked />
          ))}
        </Row>

        <Row label="checked">
          <Checkbox label="Checked" defaultChecked />
        </Row>

        <Row label="indeterminate">
          <Checkbox label="Partial" checked="indeterminate" />
        </Row>

        <Row label="disabled">
          <Checkbox label="Off" disabled />
        </Row>
      </div>
    </div>
  );
}
