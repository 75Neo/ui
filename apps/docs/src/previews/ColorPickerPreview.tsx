import { ColorPicker, parseColor } from "@75neo/react";

const presets = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7"];

export function ColorPickerPreview() {
  return (
    <ColorPicker
      label="Brand color"
      alpha
      swatches={presets}
      defaultValue={parseColor("#3b82f6")}
    />
  );
}
