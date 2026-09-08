import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerSwatchGroupProps extends React.ComponentPropsWithRef<
  typeof Ark.SwatchGroup
> {}

export default function ColorPickerSwatchGroup({
  className,
  children,
  ...props
}: ColorPickerSwatchGroupProps) {
  return (
    <Ark.SwatchGroup className={cn(styles.swatchGroup(), className)} {...props}>
      {children}
    </Ark.SwatchGroup>
  );
}
