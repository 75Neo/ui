import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerFormatTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.FormatTrigger
> {}

export default function ColorPickerFormatTrigger({
  className,
  children,
  ...props
}: ColorPickerFormatTriggerProps) {
  return (
    <Ark.FormatTrigger className={cn(styles.formatTrigger(), className)} {...props}>
      {children}
    </Ark.FormatTrigger>
  );
}
