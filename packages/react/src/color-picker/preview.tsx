import type React from "react";
import { cva } from "class-variance-authority";
import { cn, colorPickerDefaults, colorPickerSizeData } from "@75neo/themes";
import { useColorPickerVariants } from "./variants";

const colorPickerPreview = cva("relative shrink-0 overflow-hidden rounded-md ring ring-accented", {
  variants: { size: colorPickerSizeData.preview },
  defaultVariants: colorPickerDefaults,
});

export interface ColorPickerPreviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ColorPickerPreview({ className, children, ...rest }: ColorPickerPreviewProps) {
  const variants = useColorPickerVariants();

  return (
    <div
      {...rest}
      data-slot="color-picker-preview"
      className={cn(colorPickerPreview(variants), className)}
    >
      {children}
    </div>
  );
}
