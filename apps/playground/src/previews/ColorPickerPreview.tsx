import { useState } from "react";
import { colorPicker, variantValues } from "@75neo/themes";
import { type Color, ColorPicker, parseColor } from "@75neo/react";

const sizes = variantValues(colorPicker, "size");
const colors = variantValues(colorPicker, "color");

const row = "grid gap-2 @sm:grid-cols-[5rem_minmax(0,1fr)] @sm:gap-4";
const rowLabel = "text-dimmed font-mono text-[0.6875rem] leading-none";

const presets = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#64748b"];

export default function ColorPickerPreview() {
  const [color, setColor] = useState(() => parseColor("#3b82f6"));

  return (
    <div className="@container flex flex-col gap-6">
      {sizes.map((size) => (
        <div key={size} className={row}>
          <p className={rowLabel} data-identifier>
            {size}
          </p>
          <ColorPicker size={size} defaultValue={parseColor("#eb5e41")} />
        </div>
      ))}

      <hr className="border-muted" />

      {/* The variant is the accent, not the value: it reaches the focus halos and the
          ring on the selected preset, so tab through one to see it. */}
      {colors.map((accent) => (
        <div key={accent} className={row}>
          <p className={rowLabel} data-identifier>
            {accent}
          </p>
          <ColorPicker
            color={accent}
            size="sm"
            defaultValue={parseColor("#8b5cf6")}
            swatches={presets}
          />
        </div>
      ))}

      <hr className="border-muted" />

      <div className="flex flex-wrap items-start gap-8">
        <ColorPicker
          label="Alpha and eyedropper"
          alpha
          eyeDropper
          defaultValue={parseColor("rgba(59, 130, 246, 0.6)")}
        />
        <ColorPicker label="No hex field" showInput={false} defaultValue={parseColor("#22c55e")} />
        <ColorPicker label="Disabled" disabled defaultValue={parseColor("#eab308")} />
      </div>

      <hr className="border-muted" />

      {/* Controlled: the value is a Color object, so nothing reparses a string on drag. */}
      <div className="flex flex-wrap items-start gap-8">
        <ColorPicker
          label="Controlled"
          alpha
          swatches={presets}
          value={color}
          onValueChange={(details: { value: Color }) => setColor(details.value)}
        />
        <output className="font-mono text-sm text-toned">{color.toString("hex")}</output>
      </div>
    </div>
  );
}
