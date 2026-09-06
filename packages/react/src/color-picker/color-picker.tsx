import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import {
  cn,
  colorPickerDefaults,
  colorPickerSizeData,
  type ColorPickerRootProps as ColorPickerContract,
} from "@75neo/themes";
import { ColorPickerVariantsContext } from "./variants";
import { ColorPickerArea } from "./area";
import { ColorPickerAreaBackground } from "./area-background";
import { ColorPickerAreaThumb } from "./area-thumb";
import { ColorPickerChannelSlider } from "./channel-slider";
import { ColorPickerChannelSliderThumb } from "./channel-slider-thumb";
import { ColorPickerChannelSliderTrack } from "./channel-slider-track";
import { ColorPickerControl } from "./control";
import { ColorPickerEyeDropperTrigger } from "./eye-dropper-trigger";
import { ColorPickerInput } from "./input";
import { ColorPickerLabel } from "./label";
import { ColorPickerPreview } from "./preview";
import { ColorPickerSliders } from "./sliders";
import { ColorPickerSwatches } from "./swatches";
import { ColorPickerSwatchTrigger } from "./swatch-trigger";
import { ColorPickerTransparencyGrid } from "./transparency-grid";
import { ColorPickerValueSwatch } from "./value-swatch";

/**
 * Props for the ColorPicker.
 *
 * @remarks
 * `defaultValue` is dropped from the HTML attributes, since the attribute admits a
 * string where Ark's root takes a color, and `dir` because direction belongs to the
 * locale provider.
 *
 * The value comes from Ark, because React and Vue spell a controlled value too
 * differently to share one type.
 */
export interface ColorPickerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "dir">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "value" | "defaultValue" | "onValueChange" | "onValueChangeEnd" | "ids"
    >,
    ColorPickerContract<React.ReactNode> {}

export function ColorPicker({
  size,
  label,
  showInput,
  alpha,
  eyeDropper,
  swatches,
  eyeDropperIcon,
  format,
  disabled,
  readOnly,
  invalid,
  required,
  name,
  value,
  defaultValue,
  onValueChange,
  onValueChangeEnd,
  ids,
  className,
  ...rest
}: ColorPickerProps) {
  const resolved = { size: size ?? colorPickerDefaults.size };
  const withInput = showInput ?? true;

  return (
    <ColorPickerVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        data-slot="color-picker"
        data-size={resolved.size}
        className={cn(
          "flex w-full flex-col data-disabled:pointer-events-none data-disabled:opacity-75",
          className,
        )}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        onValueChangeEnd={onValueChangeEnd}
        format={format}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
        required={required}
        name={name}
        ids={ids}
      >
        {label != null && <ColorPickerLabel>{label}</ColorPickerLabel>}
        <ColorPickerArea>
          <ColorPickerAreaBackground />
          <ColorPickerAreaThumb />
        </ColorPickerArea>
        <ColorPickerSliders>
          <ColorPickerPreview>
            {(alpha ?? false) && <ColorPickerTransparencyGrid />}
            <ColorPickerValueSwatch />
          </ColorPickerPreview>
          <div
            data-slot="color-picker-channels"
            className={cn(
              "flex min-w-0 flex-1 flex-col",
              colorPickerSizeData.channels[resolved.size],
            )}
          >
            <ColorPickerChannelSlider channel="hue">
              <ColorPickerChannelSliderTrack />
              <ColorPickerChannelSliderThumb />
            </ColorPickerChannelSlider>
            {(alpha ?? false) && (
              <ColorPickerChannelSlider channel="alpha">
                <ColorPickerTransparencyGrid />
                <ColorPickerChannelSliderTrack />
                <ColorPickerChannelSliderThumb />
              </ColorPickerChannelSlider>
            )}
          </div>
        </ColorPickerSliders>
        {(withInput || (eyeDropper ?? false)) && (
          <ColorPickerControl>
            {withInput && <ColorPickerInput />}
            {(eyeDropper ?? false) && (
              <ColorPickerEyeDropperTrigger>{eyeDropperIcon}</ColorPickerEyeDropperTrigger>
            )}
          </ColorPickerControl>
        )}
        {swatches != null && swatches.length > 0 && (
          <ColorPickerSwatches>
            {swatches.map((preset) => (
              <ColorPickerSwatchTrigger key={preset} value={preset} />
            ))}
          </ColorPickerSwatches>
        )}
      </Ark.Root>
    </ColorPickerVariantsContext.Provider>
  );
}
