import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "@75neo/themes";

export interface ColorPickerValueSwatchProps extends React.ComponentProps<typeof Ark.ValueSwatch> {}

export function ColorPickerValueSwatch({ className, ...rest }: ColorPickerValueSwatchProps) {
  return (
    <Ark.ValueSwatch
      {...rest}
      data-slot="color-picker-value-swatch"
      className={cn("size-full rounded-[inherit]", className)}
    />
  );
}
