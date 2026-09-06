import type { ReactNode } from "react";
import { AngleSlider } from "@75neo/react/angle-slider";
import { angleSliderSchema } from "@75neo/themes";

const sizes = angleSliderSchema.size.values;
const colors = angleSliderSchema.color.values;

const row = "grid gap-2 @sm:grid-cols-[4.5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none @sm:pt-3";
const rowItems = "flex min-w-0 flex-wrap items-center gap-4";
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

export default function AngleSliderPreview() {
  return (
    <div className="@container">
      <div className={group}>
        <Row label="sizes">
          {sizes.map((size) => (
            <AngleSlider key={size} size={size} defaultValue={135} showValue label="Heading" />
          ))}
        </Row>
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="colors">
          {colors.map((color) => (
            <AngleSlider key={color} color={color} size="sm" defaultValue={225} showValue />
          ))}
        </Row>

        <Row label="markers">
          <AngleSlider defaultValue={90} markers={[0, 45, 90, 135, 180, 225, 270, 315]} showValue />
        </Row>

        <Row label="disabled">
          <AngleSlider defaultValue={45} showValue disabled />
        </Row>
      </div>
    </div>
  );
}
