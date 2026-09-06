import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerArea = cva("relative touch-none rounded-md ring ring-accented", {
  variants: { size: colorPickerSizeData.area },
  defaultVariants: colorPickerDefaults,
});

export interface ColorPickerAreaProps extends React.ComponentProps<typeof Ark.Area> {}

export function ColorPickerArea({ className, children, ...rest }: ColorPickerAreaProps) {
  const variants = useColorPickerVariants();

  return (
    <Ark.Area
      {...rest}
      data-slot="color-picker-area"
      className={cn(colorPickerArea(variants), className)}
    >
      {children}
    </Ark.Area>
  );
}
