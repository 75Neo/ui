import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from "@/components/react";

const colors = ["primary", "success", "warning", "error"] as const;

export default function SliderColors() {
  return (
    <div className="flex max-w-md flex-col gap-8">
      {colors.map((color, index) => (
        <Slider key={color} color={color} defaultValue={[30 + index * 15]}>
          <SliderLabel>{color}</SliderLabel>
          <SliderControl>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumb index={0}>
              <SliderHiddenInput />
            </SliderThumb>
          </SliderControl>
        </Slider>
      ))}
    </div>
  );
}
