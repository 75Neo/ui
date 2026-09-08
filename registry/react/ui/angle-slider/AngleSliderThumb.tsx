import React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cn } from "cn";
import { angleSliderStyles as styles } from "@/registry/shared/lib/angle-slider.styles";

export interface AngleSliderThumbProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Thumb>,
  "children"
> {}

export default function AngleSliderThumb({ className, ...props }: AngleSliderThumbProps) {
  return <Ark.Thumb className={cn(styles.thumb(), className)} {...props} />;
}
