import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerTransparencyGridProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.TransparencyGrid>,
  "children"
> {}

export default function ColorPickerTransparencyGrid({
  className,
  ...props
}: ColorPickerTransparencyGridProps) {
  const styles = colorPicker();

  return <Ark.TransparencyGrid className={cn(styles.transparencyGrid(), className)} {...props} />;
}
