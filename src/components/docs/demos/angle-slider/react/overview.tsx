import {
  AngleSlider,
  AngleSliderControl,
  AngleSliderHiddenInput,
  AngleSliderLabel,
  AngleSliderThumb,
  AngleSliderValueText,
} from "@/components/react";

export default function AngleSliderOverview() {
  return (
    <div className="flex justify-center">
      <AngleSlider defaultValue={135} step={15}>
        <AngleSliderLabel>Gradient angle</AngleSliderLabel>
        <AngleSliderControl>
          <AngleSliderThumb />
        </AngleSliderControl>
        <AngleSliderValueText />
        <AngleSliderHiddenInput />
      </AngleSlider>
    </div>
  );
}
