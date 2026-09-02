import type React from "react";
import { ColorPicker as Ark, type ColorPickerRootProps } from "@ark-ui/react/color-picker";
import { Pipette } from "lucide-react";
import { type ColorPickerProps as ColorPickerContract, colorPicker } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the ColorPicker.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. `defaultValue` goes with it, because
 * the attribute admits strings where Ark's root takes a `Color`.
 *
 * The value props come from Ark, because React and Vue spell a controlled color too
 * differently to share one type.
 */
export interface ColorPickerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<
      ColorPickerRootProps,
      "value" | "defaultValue" | "onValueChange" | "onValueChangeEnd" | "ids"
    >,
    ColorPickerContract<React.ReactNode> {}

export function ColorPicker({
  ui,
  color,
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
  const theme = useResolvedTheme(colorPicker, "colorPicker", { ui, color, size }, className);
  const withInput = showInput ?? true;

  return (
    <Ark.Root
      {...rest}
      inline
      data-slot="base"
      className={theme.class.base}
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
      {label != null && (
        <Ark.Label data-slot="label" className={theme.class.label}>
          {label}
        </Ark.Label>
      )}

      <Ark.Area data-slot="area" className={theme.class.area}>
        <Ark.AreaBackground data-slot="areaBackground" className={theme.class.areaBackground} />
        <Ark.AreaThumb data-slot="areaThumb" className={theme.class.areaThumb} />
      </Ark.Area>

      <div data-slot="sliders" className={theme.class.sliders}>
        {/* Ark paints the swatch itself, so the checkerboard has to sit under it in
            source order rather than behind it with a z-index. */}
        <div data-slot="preview" className={theme.class.preview}>
          {(alpha ?? false) && (
            <Ark.TransparencyGrid
              data-slot="transparencyGrid"
              className={theme.class.transparencyGrid}
            />
          )}
          <Ark.ValueSwatch data-slot="valueSwatch" className={theme.class.valueSwatch} />
        </div>

        <div data-slot="channels" className={theme.class.channels}>
          <Ark.ChannelSlider
            channel="hue"
            data-slot="channelSlider"
            className={theme.class.channelSlider}
          >
            <Ark.ChannelSliderTrack
              data-slot="channelSliderTrack"
              className={theme.class.channelSliderTrack}
            />
            <Ark.ChannelSliderThumb
              data-slot="channelSliderThumb"
              className={theme.class.channelSliderThumb}
            />
          </Ark.ChannelSlider>

          {(alpha ?? false) && (
            <Ark.ChannelSlider
              channel="alpha"
              data-slot="channelSlider"
              className={theme.class.channelSlider}
            >
              <Ark.TransparencyGrid
                data-slot="transparencyGrid"
                className={theme.class.transparencyGrid}
              />
              <Ark.ChannelSliderTrack
                data-slot="channelSliderTrack"
                className={theme.class.channelSliderTrack}
              />
              <Ark.ChannelSliderThumb
                data-slot="channelSliderThumb"
                className={theme.class.channelSliderThumb}
              />
            </Ark.ChannelSlider>
          )}
        </div>
      </div>

      {(withInput || (eyeDropper ?? false)) && (
        <div data-slot="control" className={theme.class.control}>
          {withInput && (
            <Ark.ChannelInput channel="hex" data-slot="input" className={theme.class.input} />
          )}
          {(eyeDropper ?? false) && (
            <Ark.EyeDropperTrigger data-slot="eyeDropper" className={theme.class.eyeDropper}>
              {eyeDropperIcon ?? <Pipette />}
            </Ark.EyeDropperTrigger>
          )}
        </div>
      )}

      {swatches != null && swatches.length > 0 && (
        <Ark.SwatchGroup data-slot="swatches" className={theme.class.swatches}>
          {swatches.map((preset) => (
            <Ark.SwatchTrigger
              key={preset}
              value={preset}
              data-slot="swatchTrigger"
              className={theme.class.swatchTrigger}
            >
              <Ark.Swatch value={preset} data-slot="swatch" className={theme.class.swatch} />
            </Ark.SwatchTrigger>
          ))}
        </Ark.SwatchGroup>
      )}

      <Ark.HiddenInput />
    </Ark.Root>
  );
}
