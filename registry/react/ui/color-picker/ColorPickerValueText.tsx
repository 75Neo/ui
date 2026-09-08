import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerValueTextProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ValueText>,
  "children"
> {}

export default function ColorPickerValueText({ className, ...props }: ColorPickerValueTextProps) {
  const styles = colorPicker();

  return <Ark.ValueText className={cn(styles.valueText(), className)} {...props} />;
}
