import React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn } from "cn";
import { sliderStyles as styles } from "@/registry/shared/lib/slider.styles";

export interface SliderRangeProps extends React.ComponentPropsWithRef<typeof Ark.Range> {}

export default function SliderRange({ className, ...props }: SliderRangeProps) {
  return <Ark.Range className={cn(styles.range(), className)} {...props} />;
}
