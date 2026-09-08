import React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn } from "cn";
import { sliderStyles as styles } from "@/registry/shared/lib/slider.styles";

export interface SliderLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function SliderLabel({ className, children, ...props }: SliderLabelProps) {
  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
