import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerChannelSliderThumbProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ChannelSliderThumb>,
  "children"
> {}

export default function ColorPickerChannelSliderThumb({
  className,
  ...props
}: ColorPickerChannelSliderThumbProps) {
  const styles = colorPicker();

  return (
    <Ark.ChannelSliderThumb className={cn(styles.channelSliderThumb(), className)} {...props} />
  );
}
