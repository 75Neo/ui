import type React from "react";
import { AngleSlider as Ark, type AngleSliderRootProps } from "@ark-ui/react/angle-slider";
import {
  ANGLE_SLIDER_PATH_LENGTH,
  ANGLE_SLIDER_RADIUS,
  type AngleSliderProps as AngleSliderContract,
  angleSlider,
} from "@75neo/themes";
import { useResolvedTheme } from "../hooks/useResolvedTheme";

/**
 * Props for the AngleSlider.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the variant of the same name. The value props come from Ark
 * because React and Vue spell a controlled angle too differently to share one type.
 */
export interface AngleSliderProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<AngleSliderRootProps, "value" | "defaultValue" | "onValueChange" | "onValueChangeEnd">,
    AngleSliderContract {}

export function AngleSlider({
  ui,
  size,
  color,
  label,
  showValue,
  markers,
  step,
  disabled,
  readOnly,
  invalid,
  name,
  value,
  defaultValue,
  onValueChange,
  onValueChangeEnd,
  className,
  ...rest
}: AngleSliderProps) {
  const theme = useResolvedTheme(angleSlider, "angleSlider", { ui, size, color }, className);

  return (
    <Ark.Root
      {...rest}
      data-slot="base"
      className={theme.class.base}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      onValueChangeEnd={onValueChangeEnd}
      step={step}
      disabled={disabled}
      readOnly={readOnly}
      invalid={invalid}
      name={name}
    >
      <Ark.Control data-slot="control" className={theme.class.control}>
        {/* Decoration only. The thumb below carries the slider role and the value. */}
        <svg data-slot="dial" className={theme.class.dial} viewBox="0 0 100 100" aria-hidden>
          <circle
            data-slot="track"
            className={theme.class.track}
            cx="50"
            cy="50"
            r={ANGLE_SLIDER_RADIUS}
          />
          <circle
            data-slot="range"
            className={theme.class.range}
            cx="50"
            cy="50"
            r={ANGLE_SLIDER_RADIUS}
            pathLength={ANGLE_SLIDER_PATH_LENGTH}
          />
        </svg>

        {markers != null && markers.length > 0 && (
          <Ark.MarkerGroup data-slot="markers" className={theme.class.markers}>
            {markers.map((marker) => (
              <Ark.Marker
                key={marker}
                value={marker}
                data-slot="marker"
                className={theme.class.marker}
              />
            ))}
          </Ark.MarkerGroup>
        )}

        <div data-slot="content" className={theme.class.content}>
          {/* Ark's own text reads "45deg"; this readout spells the degree sign. */}
          {(showValue ?? false) && (
            <Ark.Context>
              {(api) => (
                <Ark.ValueText data-slot="value" className={theme.class.value}>
                  {api.value}°
                </Ark.ValueText>
              )}
            </Ark.Context>
          )}
          {label != null && (
            <Ark.Label data-slot="label" className={theme.class.label}>
              {label}
            </Ark.Label>
          )}
        </div>

        <Ark.Thumb data-slot="thumb" className={theme.class.thumb} />
      </Ark.Control>

      <Ark.HiddenInput />
    </Ark.Root>
  );
}
