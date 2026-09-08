import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxItemIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemIndicator
> {}

export default function ComboboxItemIndicator({
  className,
  children,
  ...props
}: ComboboxItemIndicatorProps) {
  const styles = combobox();

  return (
    <Ark.ItemIndicator className={cn(styles.itemIndicator(), className)} {...props}>
      {children}
    </Ark.ItemIndicator>
  );
}
