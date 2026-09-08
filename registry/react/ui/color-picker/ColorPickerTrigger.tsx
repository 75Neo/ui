import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function ColorPickerTrigger({
  className,
  children,
  ...props
}: ColorPickerTriggerProps) {
  return (
    <Ark.Trigger className={cn(styles.trigger(), className)} {...props}>
      {children}
    </Ark.Trigger>
  );
}
