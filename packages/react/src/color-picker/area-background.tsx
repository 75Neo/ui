import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "@75neo/themes";

export interface ColorPickerAreaBackgroundProps extends React.ComponentProps<
  typeof Ark.AreaBackground
> {}

export function ColorPickerAreaBackground({ className, ...rest }: ColorPickerAreaBackgroundProps) {
  return (
    <Ark.AreaBackground
      {...rest}
      data-slot="color-picker-area-background"
      className={cn("size-full rounded-[inherit]", className)}
    />
  );
}
