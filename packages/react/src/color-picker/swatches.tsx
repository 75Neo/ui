import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerSwatches = cva("flex flex-wrap", {
  variants: { size: colorPickerSizeData.swatches },
  defaultVariants: colorPickerDefaults,
});

export interface ColorPickerSwatchesProps extends React.ComponentProps<typeof Ark.SwatchGroup> {}

export function ColorPickerSwatches({ className, children, ...rest }: ColorPickerSwatchesProps) {
  const variants = useColorPickerVariants();

  return (
    <Ark.SwatchGroup
      {...rest}
      data-slot="color-picker-swatches"
      className={cn(colorPickerSwatches(variants), className)}
    >
      {children}
    </Ark.SwatchGroup>
  );
}
