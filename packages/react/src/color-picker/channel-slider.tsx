import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerChannelSlider = cva("relative touch-none rounded-full ring ring-accented", {
  variants: { size: colorPickerSizeData.channelSlider },
  defaultVariants: colorPickerDefaults,
});

export interface ColorPickerChannelSliderProps extends React.ComponentProps<
  typeof Ark.ChannelSlider
> {
  /** Which channel this slider edits: hue or alpha. */
  channel: "hue" | "alpha";
}

export function ColorPickerChannelSlider({
  channel,
  className,
  children,
  ...rest
}: ColorPickerChannelSliderProps) {
  const variants = useColorPickerVariants();

  return (
    <Ark.ChannelSlider
      {...rest}
      channel={channel}
      data-slot="color-picker-channel-slider"
      className={cn(colorPickerChannelSlider(variants), className)}
    >
      {children}
    </Ark.ChannelSlider>
  );
}
