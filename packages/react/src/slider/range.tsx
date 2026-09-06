import type React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cva } from "class-variance-authority";
import { cn, sliderColorData, sliderDefaults } from "@75neo/themes";
import { useSliderVariants } from "./variants";

const sliderRange = cva(
  "rounded-full group-data-[orientation=horizontal]/slider:h-full group-data-[orientation=vertical]/slider:w-full data-disabled:bg-accented",
  {
    variants: { color: sliderColorData.range },
    defaultVariants: sliderDefaults,
  },
);

export interface SliderRangeProps extends React.ComponentProps<typeof Ark.Range> {}

export function SliderRange({ className, ...rest }: SliderRangeProps) {
  const variants = useSliderVariants();

  return (
    <Ark.Range
      {...rest}
      data-slot="slider-range"
      className={cn(sliderRange(variants), className)}
    />
  );
}
