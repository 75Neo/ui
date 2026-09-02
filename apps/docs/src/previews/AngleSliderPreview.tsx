import { AngleSlider } from "@75neo/react";

export function AngleSliderPreview() {
  return (
    <div className="flex flex-wrap items-center gap-10">
      <AngleSlider label="Rotation" showValue defaultValue={45} />
      <AngleSlider
        label="Snapped"
        showValue
        defaultValue={135}
        color="success"
        step={15}
        markers={[0, 90, 180, 270]}
      />
    </div>
  );
}
