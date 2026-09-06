import type React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "@75neo/themes";

export interface ColorPickerAreaThumbProps extends React.ComponentProps<typeof Ark.AreaThumb> {}

export function ColorPickerAreaThumb({ className, ...rest }: ColorPickerAreaThumbProps) {
  return (
    <Ark.AreaThumb
      {...rest}
      data-slot="color-picker-area-thumb"
      className={cn(
        "rounded-full shadow-sm ring-2 ring-bg outline-none focus-visible:outline-3",
        className,
      )}
    />
  );
}
