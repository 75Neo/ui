import React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn } from "cn";
import { sliderStyles as styles } from "@/registry/shared/lib/slider.styles";

export interface SliderTrackProps extends React.ComponentPropsWithRef<typeof Ark.Track> {}

export default function SliderTrack({ className, children, ...props }: SliderTrackProps) {
  return (
    <Ark.Track className={cn(styles.track(), className)} {...props}>
      {children}
    </Ark.Track>
  );
}
