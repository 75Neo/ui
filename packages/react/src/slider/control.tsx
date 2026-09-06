import type React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cva } from "class-variance-authority";
import { cn, sliderDefaults, sliderSizeData } from "@75neo/themes";
import { useSliderVariants } from "./variants";

const sliderControl = cva(
  "relative flex touch-none select-none group-data-[orientation=horizontal]/slider:w-full group-data-[orientation=horizontal]/slider:items-center group-data-[orientation=vertical]/slider:h-full group-data-[orientation=vertical]/slider:justify-center data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: { size: sliderSizeData.control },
    defaultVariants: sliderDefaults,
  },
);

export interface SliderControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function SliderControl({ className, children, ...rest }: SliderControlProps) {
  const variants = useSliderVariants();

  return (
    <Ark.Control
      {...rest}
      data-slot="slider-control"
      className={cn(sliderControl(variants), className)}
    >
      {children}
    </Ark.Control>
  );
}
