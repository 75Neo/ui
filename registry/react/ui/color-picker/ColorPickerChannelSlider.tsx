import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerChannelSliderProps extends React.ComponentPropsWithRef<
  typeof Ark.ChannelSlider
> {}

export default function ColorPickerChannelSlider({
  className,
  children,
  ...props
}: ColorPickerChannelSliderProps) {
  const styles = colorPicker();

  return (
    <Ark.ChannelSlider className={cn(styles.channelSlider(), className)} {...props}>
      {children}
    </Ark.ChannelSlider>
  );
}
