import type { ReactNode } from "react";
import { DatePicker } from "@75neo/react/date-picker";
import { datePickerSchema } from "@75neo/themes";

const sizes = datePickerSchema.size.values;
const colors = datePickerSchema.color.values;

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

export default function DatePickerPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <DatePicker size={size} label="Birthday" placeholder="Pick a date" />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          <div className="flex flex-col gap-2">
            {colors.map((color) => (
              <DatePicker key={color} color={color} placeholder="Pick a date" />
            ))}
          </div>
        </Row>

        <Row label="range">
          <DatePicker selectionMode="range" label="Stay" placeholder="Pick dates" />
        </Row>

        <Row label="disabled">
          <DatePicker placeholder="Pick a date" disabled />
        </Row>
      </div>
    </div>
  );
}
