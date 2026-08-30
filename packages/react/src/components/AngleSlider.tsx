import * as React from "react";
import { AngleSlider as ArkAngleSlider } from "@ark-ui/react/angle-slider";
import { angleSlider, type AngleSliderVariants } from "@75neo/styles";
import { ANGLE_SLIDER_DEFAULT_MARKERS, angleSliderKey, type AngleSliderUI } from "@75neo/core";
import { useComponentUI } from "../hooks/useComponentUI";
import { renderSlot, type Slot } from "../utils/renderSlot";

/** Scope handed to the `valueText` slot, matching Vue's `{ value, valueAsDegree }`. */
export type AngleSliderValueBag = { value: number; valueAsDegree: string };

export type AngleSliderProps = Omit<
  React.ComponentProps<typeof ArkAngleSlider.Root>,
  "children" | "label"
> & {
  size?: AngleSliderVariants["size"];
  markers?: number[];
  showValueText?: boolean;
  ui?: AngleSliderUI;
  /** Mirrors Vue's `#label` slot. */
  label?: Slot;
  /** Mirrors Vue's `#valueText` slot; falls back to Ark's formatted degree string. */
  valueText?: Slot<AngleSliderValueBag>;
};

export const AngleSlider = React.forwardRef<HTMLDivElement, AngleSliderProps>(
  (
    {
      ui,
      size = "md",
      label,
      valueText,
      markers = ANGLE_SLIDER_DEFAULT_MARKERS,
      showValueText = true,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const tvSlots = React.useMemo(() => angleSlider({ size, disabled }), [size, disabled]);
    const resolved = useComponentUI(angleSliderKey, tvSlots, ui);

    return (
      <ArkAngleSlider.Root
        ref={ref}
        disabled={disabled}
        className={resolved.root({ className })}
        data-slot="root"
        {...props}
      >
        {label != null && (
          <ArkAngleSlider.Label data-slot="label" className={resolved.label()}>
            {renderSlot(label)}
          </ArkAngleSlider.Label>
        )}

        <ArkAngleSlider.Control data-slot="control" className={resolved.control()}>
          {markers.length > 0 && (
            <ArkAngleSlider.MarkerGroup data-slot="markerGroup" className={resolved.markerGroup()}>
              {markers.map((marker) => (
                <ArkAngleSlider.Marker
                  key={marker}
                  value={marker}
                  data-slot="marker"
                  className={resolved.marker()}
                />
              ))}
            </ArkAngleSlider.MarkerGroup>
          )}
          <ArkAngleSlider.Thumb data-slot="thumb" className={resolved.thumb()} />
        </ArkAngleSlider.Control>

        {showValueText && (
          <ArkAngleSlider.ValueText data-slot="valueText" className={resolved.valueText()}>
            {valueText != null ? (
              <ArkAngleSlider.Context>
                {(api) =>
                  renderSlot(valueText, { value: api.value, valueAsDegree: api.valueAsDegree })
                }
              </ArkAngleSlider.Context>
            ) : undefined}
          </ArkAngleSlider.ValueText>
        )}

        <ArkAngleSlider.HiddenInput />
      </ArkAngleSlider.Root>
    );
  },
);
AngleSlider.displayName = "AngleSlider";
