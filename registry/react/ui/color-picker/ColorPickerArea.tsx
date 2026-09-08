import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerAreaProps extends React.ComponentPropsWithRef<typeof Ark.Area> {}

export default function ColorPickerArea({ className, children, ...props }: ColorPickerAreaProps) {
  return (
    <Ark.Area className={cn(styles.area(), className)} {...props}>
      {children}
    </Ark.Area>
  );
}
