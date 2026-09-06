import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerSwatchTrigger = cva(
  "cursor-pointer rounded-md ring-offset-2 ring-offset-bg outline-none focus-visible:outline-3 disabled:cursor-not-allowed data-[state=checked]:ring-2",
  {
    variants: { size: colorPickerSizeData.swatchTrigger },
    defaultVariants: colorPickerDefaults,
  },
);

export interface ColorPickerSwatchTriggerProps extends React.ComponentProps<
  typeof Ark.SwatchTrigger
> {
  /** The preset color this swatch applies. */
  value: string;
}

export function ColorPickerSwatchTrigger({
  value,
  className,
  ...rest
}: ColorPickerSwatchTriggerProps) {
  const variants = useColorPickerVariants();

  return (
    <Ark.SwatchTrigger
      {...rest}
      value={value}
      data-slot="color-picker-swatch-trigger"
      className={cn(colorPickerSwatchTrigger(variants), className)}
    />
  );
}
