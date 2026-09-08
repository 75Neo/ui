import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function ColorPickerLabel({ className, children, ...props }: ColorPickerLabelProps) {
  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
