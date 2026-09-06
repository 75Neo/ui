import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "@75neo/themes";

export interface ColorPickerTransparencyGridProps extends React.ComponentProps<
  typeof Ark.TransparencyGrid
> {}

export function ColorPickerTransparencyGrid({
  className,
  ...rest
}: ColorPickerTransparencyGridProps) {
  return (
    <Ark.TransparencyGrid
      {...rest}
      data-slot="color-picker-transparency-grid"
      className={cn("rounded-[inherit]", className)}
    />
  );
}
