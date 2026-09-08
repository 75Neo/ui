import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerPositionerProps extends React.ComponentPropsWithRef<
  typeof Ark.Positioner
> {}

export default function ColorPickerPositioner({
  className,
  children,
  ...props
}: ColorPickerPositionerProps) {
  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
