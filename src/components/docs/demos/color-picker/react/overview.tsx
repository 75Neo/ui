import { parseColor } from "@ark-ui/react/color-picker";
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaBackground,
  ColorPickerAreaThumb,
  ColorPickerChannelSlider,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerPositioner,
  ColorPickerSwatch,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerTrigger,
  ColorPickerValueSwatch,
  ColorPickerValueText,
} from "@/components/react";

const presets = ["#2563eb", "#0f766e", "#7c3aed", "#e11d48", "#f59e0b"];

export default function ColorPickerOverview() {
  return (
    <div className="max-w-64">
      <ColorPicker defaultValue={parseColor("#2563eb")}>
        <ColorPickerLabel>Primary</ColorPickerLabel>
        <ColorPickerControl>
          <ColorPickerTrigger>
            <ColorPickerValueSwatch />
          </ColorPickerTrigger>
          <ColorPickerValueText />
        </ColorPickerControl>

        <ColorPickerPositioner>
          <ColorPickerContent>
            <ColorPickerArea>
              <ColorPickerAreaBackground />
              <ColorPickerAreaThumb />
            </ColorPickerArea>

            <ColorPickerChannelSlider channel="hue">
              <ColorPickerChannelSliderTrack />
              <ColorPickerChannelSliderThumb />
            </ColorPickerChannelSlider>

            <ColorPickerChannelSlider channel="alpha">
              <ColorPickerChannelSliderTrack />
              <ColorPickerChannelSliderThumb />
            </ColorPickerChannelSlider>

            <ColorPickerSwatchGroup>
              {presets.map((preset) => (
                <ColorPickerSwatchTrigger key={preset} value={preset}>
                  <ColorPickerSwatch value={preset} />
                </ColorPickerSwatchTrigger>
              ))}
            </ColorPickerSwatchGroup>
          </ColorPickerContent>
        </ColorPickerPositioner>
        <ColorPickerHiddenInput />
      </ColorPicker>
    </div>
  );
}
