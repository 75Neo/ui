import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerEyeDropperTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.EyeDropperTrigger
> {}

export default function ColorPickerEyeDropperTrigger({
  className,
  children,
  ...props
}: ColorPickerEyeDropperTriggerProps) {
  return (
    <Ark.EyeDropperTrigger className={cn(styles.eyeDropperTrigger(), className)} {...props}>
      {children}
    </Ark.EyeDropperTrigger>
  );
}
