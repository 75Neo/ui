import * as React from "react";
import { AngleSlider as ArkAngleSlider } from "@ark-ui/react/angle-slider";
import { angleSlider, type SlotClass } from "@75neo/styles";
import { useComponentUI } from "../hooks/useComponentUI";

export type AngleSliderUI = {
  root?: SlotClass;
  label?: SlotClass;
  control?: SlotClass;
  thumb?: SlotClass;
  markerGroup?: SlotClass;
  marker?: SlotClass;
  valueText?: SlotClass;
};

export type AngleSliderProps = Omit<
  React.ComponentProps<typeof ArkAngleSlider.Root>,
  "children"
> & {
  size?: "sm" | "md" | "lg";
  label?: string;
  markers?: number[];
  showValueText?: boolean;
  ui?: AngleSliderUI;
  children?: React.ReactNode;
};

const DEFAULT_MARKERS = [0, 45, 90, 135, 180, 225, 270, 315];

export const AngleSlider = React.forwardRef<HTMLDivElement, AngleSliderProps>(
  (
    {
      ui,
      size = "md",
      label,
      markers = DEFAULT_MARKERS,
      showValueText = true,
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    const tvSlots = React.useMemo(
      () => angleSlider({ size, disabled: disabled || undefined }),
      [size, disabled],
    );
    const resolved = useComponentUI("angleSlider", tvSlots, ui);

    // If custom children provided, render composition via Ark primitives with styled slots
    if (children) {
      return (
        <ArkAngleSlider.Root
          ref={ref}
          disabled={disabled}
          className={resolved.root()}
          data-slot="root"
          {...props}
        >
          {children}
        </ArkAngleSlider.Root>
      );
    }

    return (
      <ArkAngleSlider.Root
        ref={ref}
        disabled={disabled}
        className={resolved.root()}
        data-slot="root"
        {...props}
      >
        {label && (
          <ArkAngleSlider.Label className={resolved.label()} data-slot="label">
            {label}
          </ArkAngleSlider.Label>
        )}
        <ArkAngleSlider.Control className={resolved.control()} data-slot="control">
          {markers.length > 0 && (
            <ArkAngleSlider.MarkerGroup className={resolved.markerGroup()} data-slot="markerGroup">
              {markers.map((value) => (
                <ArkAngleSlider.Marker
                  key={value}
                  value={value}
                  className={resolved.marker()}
                  data-slot="marker"
                />
              ))}
            </ArkAngleSlider.MarkerGroup>
          )}
          <ArkAngleSlider.Thumb className={resolved.thumb()} data-slot="thumb" />
        </ArkAngleSlider.Control>
        {showValueText && (
          <ArkAngleSlider.ValueText className={resolved.valueText()} data-slot="valueText" />
        )}
        <ArkAngleSlider.HiddenInput />
      </ArkAngleSlider.Root>
    );
  },
);
AngleSlider.displayName = "AngleSlider";

// --- Primitive exports for composition ---

export const AngleSliderRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ArkAngleSlider.Root> & {
    size?: "sm" | "md" | "lg";
    ui?: AngleSliderUI;
  }
>(({ size = "md", ui, className, disabled, ...props }, ref) => {
  const tvSlots = React.useMemo(
    () => angleSlider({ size, disabled: disabled || undefined }),
    [size, disabled],
  );
  const resolved = useComponentUI("angleSlider", tvSlots, ui);
  return (
    <ArkAngleSlider.Root
      ref={ref}
      disabled={disabled}
      className={resolved.root({ className })}
      data-slot="root"
      {...props}
    />
  );
});
AngleSliderRoot.displayName = "AngleSliderRoot";

export const AngleSliderLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<typeof ArkAngleSlider.Label> & { ui?: AngleSliderUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => angleSlider({}), []);
  const resolved = useComponentUI("angleSlider", tvSlots, ui);
  return (
    <ArkAngleSlider.Label
      ref={ref}
      className={resolved.label({ className })}
      data-slot="label"
      {...props}
    />
  );
});
AngleSliderLabel.displayName = "AngleSliderLabel";

export const AngleSliderControl = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ArkAngleSlider.Control> & { ui?: AngleSliderUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => angleSlider({}), []);
  const resolved = useComponentUI("angleSlider", tvSlots, ui);
  return (
    <ArkAngleSlider.Control
      ref={ref}
      className={resolved.control({ className })}
      data-slot="control"
      {...props}
    />
  );
});
AngleSliderControl.displayName = "AngleSliderControl";

export const AngleSliderThumb = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ArkAngleSlider.Thumb> & { ui?: AngleSliderUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => angleSlider({}), []);
  const resolved = useComponentUI("angleSlider", tvSlots, ui);
  return (
    <ArkAngleSlider.Thumb
      ref={ref}
      className={resolved.thumb({ className })}
      data-slot="thumb"
      {...props}
    />
  );
});
AngleSliderThumb.displayName = "AngleSliderThumb";

export const AngleSliderMarkerGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ArkAngleSlider.MarkerGroup> & { ui?: AngleSliderUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => angleSlider({}), []);
  const resolved = useComponentUI("angleSlider", tvSlots, ui);
  return (
    <ArkAngleSlider.MarkerGroup
      ref={ref}
      className={resolved.markerGroup({ className })}
      data-slot="markerGroup"
      {...props}
    />
  );
});
AngleSliderMarkerGroup.displayName = "AngleSliderMarkerGroup";

export const AngleSliderMarker = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ArkAngleSlider.Marker> & { ui?: AngleSliderUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => angleSlider({}), []);
  const resolved = useComponentUI("angleSlider", tvSlots, ui);
  return (
    <ArkAngleSlider.Marker
      ref={ref}
      className={resolved.marker({ className })}
      data-slot="marker"
      {...props}
    />
  );
});
AngleSliderMarker.displayName = "AngleSliderMarker";

export const AngleSliderValueText = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ArkAngleSlider.ValueText> & { ui?: AngleSliderUI }
>(({ className, ui, ...props }, ref) => {
  const tvSlots = React.useMemo(() => angleSlider({}), []);
  const resolved = useComponentUI("angleSlider", tvSlots, ui);
  return (
    <ArkAngleSlider.ValueText
      ref={ref}
      className={resolved.valueText({ className })}
      data-slot="valueText"
      {...props}
    />
  );
});
AngleSliderValueText.displayName = "AngleSliderValueText";

export const AngleSliderHiddenInput = ArkAngleSlider.HiddenInput;

export const AngleSliderContext = ArkAngleSlider.Context;
