import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerPositionerProps extends React.ComponentPropsWithRef<
  typeof Ark.Positioner
> {}

export default function ColorPickerPositioner({
  className,
  children,
  ...props
}: ColorPickerPositionerProps) {
  const styles = colorPicker();

  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
