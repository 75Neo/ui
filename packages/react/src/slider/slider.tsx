import type React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn, sliderDefaults, type SliderRootProps as SliderContract } from "@75neo/themes";
import { SliderVariantsContext } from "./variants";
import { SliderControl } from "./control";
import { SliderLabel } from "./label";
import { SliderMarker } from "./marker";
import { SliderMarkerGroup } from "./marker-group";
import { SliderRange } from "./range";
import { SliderThumb } from "./thumb";
import { SliderTrack } from "./track";
import { SliderValueText } from "./value-text";

/**
 * Props for the Slider.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the axis of the same name, and `defaultValue` goes with it since
 * the attribute admits a string where Ark's root takes an array of numbers. The two
 * aria label attributes go too: Ark takes one per thumb, so its own are arrays.
 */
export interface SliderProps
  extends
    Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "color" | "defaultValue" | "dir" | "aria-label" | "aria-labelledby"
    >,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "value" | "defaultValue" | "onValueChange" | "onValueChangeEnd" | "form" | "ids"
    >,
    SliderContract {
  children?: React.ReactNode;
}

export function Slider({
  color,
  size,
  label,
  showValue,
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
  children,
  ...rest
}: SliderProps) {
  const resolved = {
    color: color ?? sliderDefaults.color,
    size: size ?? sliderDefaults.size,
  };

  return (
    <SliderVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
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
        data-slot="slider"
        data-color={resolved.color}
        data-size={resolved.size}
        className={cn(
          "group/slider flex min-w-0 gap-2 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:flex-col data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-row-reverse",
          className,
        )}
      >
        {children ?? (
          <>
            {(label != null || showValue) && (
              <span
                data-slot="slider-header"
                className="flex min-w-0 items-center justify-between gap-2"
              >
                {label != null && <SliderLabel>{label}</SliderLabel>}
                {showValue && <SliderValueText />}
              </span>
            )}
            <SliderControl>
              <SliderTrack>
                <SliderRange />
              </SliderTrack>
              {/* One thumb per value, which is the whole of what makes a range. */}
              <Ark.Context>
                {(api) => api.value.map((_, index) => <SliderThumb key={index} index={index} />)}
              </Ark.Context>
            </SliderControl>
            {marks != null && marks.length > 0 && (
              <SliderMarkerGroup>
                {marks.map((mark) => (
                  <SliderMarker key={mark.value} value={mark.value}>
                    {mark.label}
                  </SliderMarker>
                ))}
              </SliderMarkerGroup>
            )}
          </>
        )}
      </Ark.Root>
    </SliderVariantsContext.Provider>
  );
}
