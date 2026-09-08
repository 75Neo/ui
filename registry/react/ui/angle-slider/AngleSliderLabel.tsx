import React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cn } from "cn";
import { angleSliderStyles as styles } from "@/registry/shared/lib/angle-slider.styles";

export interface AngleSliderLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function AngleSliderLabel({ className, children, ...props }: AngleSliderLabelProps) {
  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
