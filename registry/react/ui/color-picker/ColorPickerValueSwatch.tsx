import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerValueSwatchProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.ValueSwatch>,
  "children"
> {}

export default function ColorPickerValueSwatch({
  className,
  ...props
}: ColorPickerValueSwatchProps) {
  const styles = colorPicker();

  return <Ark.ValueSwatch className={cn(styles.valueSwatch(), className)} {...props} />;
}
