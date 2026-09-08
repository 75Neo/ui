import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerSwatchIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.SwatchIndicator
> {}

export default function ColorPickerSwatchIndicator({
  className,
  children,
  ...props
}: ColorPickerSwatchIndicatorProps) {
  const styles = colorPicker();

  return (
    <Ark.SwatchIndicator className={cn(styles.swatchIndicator(), className)} {...props}>
      {children}
    </Ark.SwatchIndicator>
  );
}
