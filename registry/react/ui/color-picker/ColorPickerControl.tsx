import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function ColorPickerControl({
  className,
  children,
  ...props
}: ColorPickerControlProps) {
  const styles = colorPicker();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
