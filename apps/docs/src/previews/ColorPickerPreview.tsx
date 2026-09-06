import { ColorPicker, parseColor } from "@75neo/react/color-picker";

export function ColorPickerPreview() {
  return (
    <div className="max-w-xs">
      <ColorPicker label="Brand" defaultValue={parseColor("#3b82f6")} />
    </div>
  );
}
