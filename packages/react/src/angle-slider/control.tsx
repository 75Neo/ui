import type React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cva } from "class-variance-authority";
import {
  ANGLE_SLIDER_PATH_LENGTH,
  ANGLE_SLIDER_RADIUS,
  angleSliderColorData,
  angleSliderDefaults,
  angleSliderSizeData,
  cn,
} from "@75neo/themes";
import { useAngleSliderVariants } from "./variants";

const angleSliderControl = cva("relative aspect-square", {
  variants: { size: angleSliderSizeData.control },
  defaultVariants: angleSliderDefaults,
});

const angleSliderRange = cva(
  "fill-none stroke-12 [stroke-dasharray:var(--value)_360] [stroke-linecap:round]",
  {
    variants: { color: angleSliderColorData.range },
    defaultVariants: angleSliderDefaults,
  },
);

export interface AngleSliderControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function AngleSliderControl({ className, children, ...rest }: AngleSliderControlProps) {
  const variants = useAngleSliderVariants();

  return (
    <Ark.Control
      {...rest}
      data-slot="angle-slider-control"
      className={cn(angleSliderControl(variants), className)}
    >
      {/* Decoration only. The thumb carries the slider role and the value. */}
      <svg
        data-slot="angle-slider-dial"
        className="absolute inset-0 size-full origin-center -rotate-90"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <circle
          data-slot="angle-slider-track"
          className="fill-none stroke-accented stroke-12"
          cx="50"
          cy="50"
          r={ANGLE_SLIDER_RADIUS}
        />
        <circle
          data-slot="angle-slider-range"
          className={angleSliderRange(variants)}
          cx="50"
          cy="50"
          r={ANGLE_SLIDER_RADIUS}
          pathLength={ANGLE_SLIDER_PATH_LENGTH}
        />
      </svg>
      {children}
    </Ark.Control>
  );
}
