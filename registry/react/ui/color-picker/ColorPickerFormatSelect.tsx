import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerFormatSelectProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.FormatSelect>,
  "children"
> {}

export default function ColorPickerFormatSelect({
  className,
  ...props
}: ColorPickerFormatSelectProps) {
  const styles = colorPicker();

  return <Ark.FormatSelect className={cn(styles.formatSelect(), className)} {...props} />;
}
