import type React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cva } from "class-variance-authority";
import { cn, sliderDefaults, sliderSizeData } from "@75neo/themes";
import { useSliderVariants } from "./variants";

const sliderValueText = cva("shrink-0 text-muted tabular-nums", {
  variants: { size: sliderSizeData.valueText },
  defaultVariants: sliderDefaults,
});

export interface SliderValueTextProps extends React.ComponentProps<typeof Ark.ValueText> {}

export function SliderValueText({ className, children, ...rest }: SliderValueTextProps) {
  const variants = useSliderVariants();

  return (
    <Ark.ValueText
      {...rest}
      data-slot="slider-value-text"
      className={cn(sliderValueText(variants), className)}
    >
      {children}
    </Ark.ValueText>
  );
}
