import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerChannelInputProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ChannelInput>,
  "children"
> {}

export default function ColorPickerChannelInput({
  className,
  ...props
}: ColorPickerChannelInputProps) {
  const styles = colorPicker();

  return <Ark.ChannelInput className={cn(styles.channelInput(), className)} {...props} />;
}
