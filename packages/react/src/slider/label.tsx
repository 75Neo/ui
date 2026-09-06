import type React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cva } from "class-variance-authority";
import { cn, sliderDefaults, sliderSizeData } from "@75neo/themes";
import { useSliderVariants } from "./variants";

const sliderLabel = cva("min-w-0 truncate font-medium text-highlighted select-none", {
  variants: { size: sliderSizeData.label },
  defaultVariants: sliderDefaults,
});

export interface SliderLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function SliderLabel({ className, children, ...rest }: SliderLabelProps) {
  const variants = useSliderVariants();

  return (
    <Ark.Label {...rest} data-slot="slider-label" className={cn(sliderLabel(variants), className)}>
      {children}
    </Ark.Label>
  );
}
