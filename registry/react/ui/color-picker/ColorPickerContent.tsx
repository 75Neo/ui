import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPickerStyles as styles } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function ColorPickerContent({
  className,
  children,
  ...props
}: ColorPickerContentProps) {
  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
