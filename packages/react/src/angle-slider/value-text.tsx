import type React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cva } from "class-variance-authority";
import { angleSliderColorData, angleSliderDefaults, angleSliderSizeData, cn } from "@75neo/themes";
import { useAngleSliderVariants } from "./variants";

const angleSliderValueText = cva("font-semibold tabular-nums", {
  variants: {
    color: angleSliderColorData.valueText,
    size: angleSliderSizeData.valueText,
  },
  defaultVariants: angleSliderDefaults,
});

export interface AngleSliderValueTextProps extends React.ComponentProps<typeof Ark.ValueText> {}

export function AngleSliderValueText({ className, children, ...rest }: AngleSliderValueTextProps) {
  const variants = useAngleSliderVariants();

  return (
    <Ark.ValueText
      {...rest}
      data-slot="angle-slider-value-text"
      className={cn(angleSliderValueText(variants), className)}
    >
      {/* Ark's own text reads "45deg"; this readout spells the degree sign. */}
      {children ?? <Ark.Context>{(api) => `${api.value}°`}</Ark.Context>}
    </Ark.ValueText>
  );
}
