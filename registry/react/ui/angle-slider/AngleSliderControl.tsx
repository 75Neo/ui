import React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cn } from "cn";
import { angleSliderStyles as styles } from "@/registry/shared/lib/angle-slider.styles";

export interface AngleSliderControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function AngleSliderControl({
  className,
  children,
  ...props
}: AngleSliderControlProps) {
  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
