import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerTransparencyGridProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.TransparencyGrid>,
  "children"
> {}

export default function ColorPickerTransparencyGrid({
  className,
  ...props
}: ColorPickerTransparencyGridProps) {
  return <Ark.TransparencyGrid className={cn(styles.transparencyGrid(), className)} {...props} />;
}
