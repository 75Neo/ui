import React from "react";
import { ColorPicker as Ark } from "@ark-ui/react/color-picker";
import { cn } from "cn";
import { colorPicker } from "@/registry/shared/lib/color-picker.styles";

export interface ColorPickerProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function ColorPicker({ className, children, ...props }: ColorPickerProps) {
  const styles = colorPicker();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
