import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerViewProps extends React.ComponentPropsWithRef<typeof Ark.View> {}

export default function ColorPickerView({ className, children, ...props }: ColorPickerViewProps) {
  return (
    <Ark.View className={cn(styles.view(), className)} {...props}>
      {children}
    </Ark.View>
  );
}
