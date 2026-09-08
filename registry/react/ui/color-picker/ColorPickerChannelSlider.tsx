import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerChannelSliderProps extends React.ComponentPropsWithRef<
  typeof Ark.ChannelSlider
> {}

export default function ColorPickerChannelSlider({
  className,
  children,
  ...props
}: ColorPickerChannelSliderProps) {
  return (
    <Ark.ChannelSlider className={cn(styles.channelSlider(), className)} {...props}>
      {children}
    </Ark.ChannelSlider>
  );
}
