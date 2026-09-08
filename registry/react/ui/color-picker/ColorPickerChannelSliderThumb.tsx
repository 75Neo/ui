import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerChannelSliderThumbProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ChannelSliderThumb>,
  "children"
> {}

export default function ColorPickerChannelSliderThumb({
  className,
  ...props
}: ColorPickerChannelSliderThumbProps) {
  return (
    <Ark.ChannelSliderThumb className={cn(styles.channelSliderThumb(), className)} {...props} />
  );
}
