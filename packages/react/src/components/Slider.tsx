import type React from "react";
import { Slider as Ark, type SliderRootProps } from "@ark-ui/react/slider";
import { type SliderProps as SliderContract, slider } from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the Slider.
 *
 * @remarks
 * Four HTML attributes are dropped. `color` would collide with the variant and
 * `defaultValue` with Ark's own prop; `aria-label` and `aria-labelledby` are arrays here
 * rather than strings, because a slider labels one thumb per value and Ark takes one
 * entry for each.
 */
export interface SliderProps
  extends
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "aria-label" | "aria-labelledby" | "color" | "defaultValue" | "dir"
    >,
    Pick<
      SliderRootProps,
      | "value"
      | "defaultValue"
      | "onValueChange"
      | "onValueChangeEnd"
      | "aria-label"
      | "aria-labelledby"
      | "ids"
    >,
    SliderContract {}

export function Slider({
  ui,
  color,
  size,
  label,
  showValue = false,
  marks,
  min,
  max,
  step,
  orientation,
  origin,
  minStepsBetweenThumbs,
  disabled,
  readOnly,
  invalid,
  name,
  form,
  value,
  defaultValue,
  onValueChange,
  onValueChangeEnd,
  ids,
  className,
  ...rest
}: SliderProps) {
  const theme = useResolvedTheme(slider, "slider", { ui, color, size }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      onValueChangeEnd={onValueChangeEnd}
      min={min}
      max={max}
      step={step}
      orientation={orientation}
      origin={origin}
      minStepsBetweenThumbs={minStepsBetweenThumbs}
      disabled={disabled}
      readOnly={readOnly}
      invalid={invalid}
      name={name}
      form={form}
      ids={ids}
    >
      {(label != null || showValue) && (
        <div data-slot="header" className={theme.class.header}>
          {label != null && (
            <Ark.Label data-slot="label" className={theme.class.label}>
              {label}
            </Ark.Label>
          )}
          {showValue && <Ark.ValueText data-slot="valueText" className={theme.class.valueText} />}
        </div>
      )}

      <Ark.Control data-slot="control" className={theme.class.control}>
        <Ark.Track data-slot="track" className={theme.class.track}>
          <Ark.Range data-slot="range" className={theme.class.range} />
        </Ark.Track>
        {/* One thumb per value, which is the whole of what makes a range slider. */}
        <Ark.Context>
          {(api) =>
            api.value.map((_, index) => (
              <Ark.Thumb key={index} index={index} data-slot="thumb" className={theme.class.thumb}>
                <Ark.HiddenInput />
              </Ark.Thumb>
            ))
          }
        </Ark.Context>
      </Ark.Control>

      {marks != null && marks.length > 0 && (
        <Ark.MarkerGroup data-slot="markerGroup" className={theme.class.markerGroup}>
          {marks.map((mark) => (
            <Ark.Marker
              key={mark.value}
              value={mark.value}
              data-slot="marker"
              className={theme.class.marker}
            >
              {mark.label}
            </Ark.Marker>
          ))}
        </Ark.MarkerGroup>
      )}
    </Ark.Root>
  );
}
