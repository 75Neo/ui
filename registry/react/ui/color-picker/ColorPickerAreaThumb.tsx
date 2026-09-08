import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerAreaThumbProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.AreaThumb>,
  "children"
> {}

export default function ColorPickerAreaThumb({ className, ...props }: ColorPickerAreaThumbProps) {
  const styles = colorPicker();

  return <Ark.AreaThumb className={cn(styles.areaThumb(), className)} {...props} />;
}
