import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerChannelSliderTrackProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ChannelSliderTrack>,
  "children"
> {}

export default function ColorPickerChannelSliderTrack({
  className,
  ...props
}: ColorPickerChannelSliderTrackProps) {
  const styles = colorPicker();

  return (
    <Ark.ChannelSliderTrack className={cn(styles.channelSliderTrack(), className)} {...props} />
  );
}
