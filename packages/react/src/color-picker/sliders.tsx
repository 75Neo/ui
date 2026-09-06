import type React from "react";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerSliders = cva("flex items-center", {
  variants: { size: colorPickerSizeData.sliders },
  defaultVariants: colorPickerDefaults,
});

export interface ColorPickerSlidersProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ColorPickerSliders({ className, children, ...rest }: ColorPickerSlidersProps) {
  const variants = useColorPickerVariants();

  return (
    <div
      {...rest}
      data-slot="color-picker-sliders"
      className={cn(colorPickerSliders(variants), className)}
    >
      {children}
    </div>
  );
}
