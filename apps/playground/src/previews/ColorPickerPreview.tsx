import type { ReactNode } from "react";
import { ColorPicker, parseColor } from "@75neo/react/color-picker";
import { colorPickerSchema } from "@75neo/themes";

const sizes = colorPickerSchema.size.values;

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

export default function ColorPickerPreview() {
  return (
    <div className="@container">
      <div className={group}>
        {sizes.map((size) => (
          <Row key={size} label={size}>
            <ColorPicker size={size} label="Brand" defaultValue={parseColor("#3b82f6")} />
          </Row>
        ))}
      </div>

      <hr className={rule} />

      <div className={group}>
        <Row label="alpha">
          <ColorPicker label="Brand" alpha defaultValue={parseColor("#3b82f680")} />
        </Row>

        <Row label="swatches">
          <ColorPicker
            label="Brand"
            defaultValue={parseColor("#3b82f6")}
            swatches={["#ef4444", "#22c55e", "#3b82f6"]}
          />
        </Row>

        <Row label="eye dropper">
          <ColorPicker label="Brand" eyeDropper defaultValue={parseColor("#3b82f6")} />
        </Row>
      </div>
    </div>
  );
}
