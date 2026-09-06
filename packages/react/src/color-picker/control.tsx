import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "@75neo/themes";

export interface ColorPickerControlProps extends React.ComponentProps<typeof Ark.Control> {}

export function ColorPickerControl({ className, children, ...rest }: ColorPickerControlProps) {
  return (
    <Ark.Control
      {...rest}
      data-slot="color-picker-control"
      className={cn("flex items-center gap-2", className)}
    >
      {children}
    </Ark.Control>
  );
}
