import type { ReactNode } from "react";
import { Slider } from "@75neo/react/slider";
import { sliderSchema } from "@75neo/themes";

const sizes = sliderSchema.size.values;
const colors = sliderSchema.color.values;

const marks = [
  { value: 0, label: "0" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-1";
const rowItems = "min-w-0 max-w-sm";
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

export default function SliderPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <Slider size={size} defaultValue={[40]} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        {colors.map((color) => (
          <Row key={color} label={color}>
            <Slider color={color} defaultValue={[65]} />
          </Row>
        ))}

        <Row label="label">
          <Slider label="Volume" showValue defaultValue={[30]} />
        </Row>

        <Row label="range">
          <Slider defaultValue={[25, 75]} />
        </Row>

        <Row label="marks">
          <Slider defaultValue={[50]} marks={marks} />
        </Row>

        <Row label="disabled">
          <Slider defaultValue={[40]} disabled />
        </Row>

        <Row label="vertical">
          <Slider orientation="vertical" defaultValue={[40]} className="h-32" />
        </Row>
      </div>
    </div>
  );
}
