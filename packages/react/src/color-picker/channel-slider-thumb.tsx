import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerChannelSliderThumb = cva(
  "-translate-1/2 rounded-full shadow-sm ring-2 ring-bg outline-none focus-visible:outline-3",
  {
    variants: { size: colorPickerSizeData.channelSliderThumb },
    defaultVariants: colorPickerDefaults,
  },
);

export interface ColorPickerChannelSliderThumbProps extends React.ComponentProps<
  typeof Ark.ChannelSliderThumb
> {}

export function ColorPickerChannelSliderThumb({
  className,
  ...rest
}: ColorPickerChannelSliderThumbProps) {
  const variants = useColorPickerVariants();

  return (
    <Ark.ChannelSliderThumb
      {...rest}
      data-slot="color-picker-channel-slider-thumb"
      className={cn(colorPickerChannelSliderThumb(variants), className)}
    />
  );
}
