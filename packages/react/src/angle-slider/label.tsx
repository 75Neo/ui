import type React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cva } from "class-variance-authority";
import { angleSliderDefaults, angleSliderSizeData, cn } from "@75neo/themes";
import { useAngleSliderVariants } from "./variants";

const angleSliderLabel = cva("pointer-events-auto cursor-pointer text-muted select-none", {
  variants: { size: angleSliderSizeData.label },
  defaultVariants: angleSliderDefaults,
});

export interface AngleSliderLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function AngleSliderLabel({ className, children, ...rest }: AngleSliderLabelProps) {
  const variants = useAngleSliderVariants();

  return (
    <Ark.Label
      {...rest}
      data-slot="angle-slider-label"
      className={cn(angleSliderLabel(variants), className)}
    >
      {children}
    </Ark.Label>
  );
}
