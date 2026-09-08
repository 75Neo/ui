import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerSwatchProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Swatch>,
  "children"
> {}

export default function ColorPickerSwatch({ className, ...props }: ColorPickerSwatchProps) {
  return <Ark.Swatch className={cn(styles.swatch(), className)} {...props} />;
}
