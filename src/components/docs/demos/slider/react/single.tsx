import {
  Slider,
  SliderControl,
  SliderHiddenInput,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
  SliderValueText,
} from "@/components/react";

export default function SliderSingle() {
  return (
    <div className="flex max-w-md flex-col gap-8">
      <Slider defaultValue={[40]}>
        <div className="flex items-baseline justify-between gap-4">
          <SliderLabel>Corner radius</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          <SliderThumb index={0}>
            <SliderHiddenInput />
          </SliderThumb>
        </SliderControl>
      </Slider>

      <Slider defaultValue={[20, 80]}>
        <div className="flex items-baseline justify-between gap-4">
          <SliderLabel>Container width</SliderLabel>
          <SliderValueText />
        </div>
        <SliderControl>
          <SliderTrack>
            <SliderRange />
          </SliderTrack>
          {[0, 1].map((index) => (
            <SliderThumb key={index} index={index}>
              <SliderHiddenInput />
            </SliderThumb>
          ))}
        </SliderControl>
      </Slider>
    </div>
  );
}
