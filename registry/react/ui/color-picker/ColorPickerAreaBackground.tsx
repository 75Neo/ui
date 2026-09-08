import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerAreaBackgroundProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.AreaBackground>,
  "children"
> {}

export default function ColorPickerAreaBackground({
  className,
  ...props
}: ColorPickerAreaBackgroundProps) {
  return <Ark.AreaBackground className={cn(styles.areaBackground(), className)} {...props} />;
}
