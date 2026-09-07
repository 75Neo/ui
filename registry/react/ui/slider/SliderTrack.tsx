import React from "react";
import { Slider as Ark } from "@ark-ui/react/slider";
import { cn } from "cn";
import { slider } from "@/registry/shared/lib/slider.styles";

export interface SliderTrackProps extends React.ComponentPropsWithRef<typeof Ark.Track> {}

export default function SliderTrack({ className, children, ...props }: SliderTrackProps) {
  const styles = slider();

  return (
    <Ark.Track className={cn(styles.track(), className)} {...props}>
      {children}
    </Ark.Track>
  );
}
