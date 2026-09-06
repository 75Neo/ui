import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "@75neo/themes";

export interface ColorPickerChannelSliderTrackProps extends React.ComponentProps<
  typeof Ark.ChannelSliderTrack
> {}

export function ColorPickerChannelSliderTrack({
  className,
  ...rest
}: ColorPickerChannelSliderTrackProps) {
  return (
    <Ark.ChannelSliderTrack
      {...rest}
      data-slot="color-picker-channel-slider-track"
      className={cn("size-full rounded-[inherit]", className)}
    />
  );
}
