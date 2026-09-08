import React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn } from "cn";
import { sliderStyles as styles } from "@/registry/shared/lib/slider.styles";

export interface SliderValueTextProps extends React.ComponentPropsWithRef<typeof Ark.ValueText> {}

export default function SliderValueText({ className, ...props }: SliderValueTextProps) {
  return <Ark.ValueText className={cn(styles.valueText(), className)} {...props} />;
}
