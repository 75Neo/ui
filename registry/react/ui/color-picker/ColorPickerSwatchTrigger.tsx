import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerSwatchTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.SwatchTrigger
> {}

export default function ColorPickerSwatchTrigger({
  className,
  children,
  ...props
}: ColorPickerSwatchTriggerProps) {
  return (
    <Ark.SwatchTrigger className={cn(styles.swatchTrigger(), className)} {...props}>
      {children}
    </Ark.SwatchTrigger>
  );
}
