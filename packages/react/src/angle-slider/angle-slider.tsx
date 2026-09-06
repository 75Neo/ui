import type React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import {
  angleSliderDefaults,
  cn,
  type AngleSliderRootProps as AngleSliderContract,
} from "@75neo/themes";
import { AngleSliderVariantsContext } from "./variants";
import { AngleSliderControl } from "./control";
import { AngleSliderLabel } from "./label";
import { AngleSliderMarker } from "./marker";
import { AngleSliderMarkerGroup } from "./marker-group";
import { AngleSliderThumb } from "./thumb";
import { AngleSliderValueText } from "./value-text";

/**
 * Props for the AngleSlider.
 *
 * @remarks
 * `color` is dropped from the HTML attributes: the legacy presentational attribute
 * would collide with the axis of the same name. The value props come from Ark, because
 * React and Vue spell a controlled angle too differently to share one type.
 */
export interface AngleSliderProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "defaultValue" | "dir">,
    Pick<
      React.ComponentProps<typeof Ark.Root>,
      "value" | "defaultValue" | "onValueChange" | "onValueChangeEnd" | "ids"
    >,
    AngleSliderContract {
  children?: React.ReactNode;
}

export function AngleSlider({
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
  ids,
  className,
  children,
  ...rest
}: AngleSliderProps) {
  const resolved = {
    size: size ?? angleSliderDefaults.size,
    color: color ?? angleSliderDefaults.color,
  };

  return (
    <AngleSliderVariantsContext.Provider value={resolved}>
      <Ark.Root
        {...rest}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        onValueChangeEnd={onValueChangeEnd}
        step={step}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
        name={name}
        ids={ids}
        data-slot="angle-slider"
        data-size={resolved.size}
        data-color={resolved.color}
        className={cn(
          "inline-flex data-disabled:pointer-events-none data-disabled:opacity-75",
          className,
        )}
      >
        {children ?? (
          <AngleSliderControl>
            {markers != null && markers.length > 0 && (
              <AngleSliderMarkerGroup>
                {markers.map((marker) => (
                  <AngleSliderMarker key={marker} value={marker} />
                ))}
              </AngleSliderMarkerGroup>
            )}
            <span
              data-slot="angle-slider-content"
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
            >
              {(showValue ?? false) && <AngleSliderValueText />}
              {label != null && <AngleSliderLabel>{label}</AngleSliderLabel>}
            </span>
            <AngleSliderThumb />
          </AngleSliderControl>
        )}
        {/* The one part with no class of its own: it is what puts the angle in a form. */}
        <Ark.HiddenInput />
      </Ark.Root>
    </AngleSliderVariantsContext.Provider>
  );
}
