import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerInput = cva(
  "min-w-0 flex-1 rounded-md bg-default font-mono text-toned uppercase ring ring-accented outline-none ring-inset focus-visible:ring-2 disabled:cursor-not-allowed",
  {
    variants: { size: colorPickerSizeData.input },
    defaultVariants: colorPickerDefaults,
  },
);

export interface ColorPickerInputProps extends Omit<
  React.ComponentProps<typeof Ark.ChannelInput>,
  "channel"
> {}

export function ColorPickerInput({ className, ...rest }: ColorPickerInputProps) {
  const variants = useColorPickerVariants();

  return (
    <Ark.ChannelInput
      {...rest}
      channel="hex"
      data-slot="color-picker-input"
      className={cn(colorPickerInput(variants), className)}
    />
  );
}
