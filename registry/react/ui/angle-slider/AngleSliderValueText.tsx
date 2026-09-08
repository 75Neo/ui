import React from "react";
import { AngleSlider as Ark } from "@ark-ui/react/angle-slider";
import { cn } from "cn";
import { angleSliderStyles as styles } from "@/registry/shared/lib/angle-slider.styles";

export interface AngleSliderValueTextProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ValueText>,
  "children"
> {}

export default function AngleSliderValueText({ className, ...props }: AngleSliderValueTextProps) {
  return <Ark.ValueText className={cn(styles.valueText(), className)} {...props} />;
}
