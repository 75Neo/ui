import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "@75neo/themes";

export interface ColorPickerLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function ColorPickerLabel({ className, children, ...rest }: ColorPickerLabelProps) {
  return (
    <Ark.Label
      {...rest}
      data-slot="color-picker-label"
      className={cn("font-medium text-highlighted select-none", className)}
    >
      {children}
    </Ark.Label>
  );
}
