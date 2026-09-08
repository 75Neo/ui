import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxItemGroupProps extends React.ComponentPropsWithRef<typeof Ark.ItemGroup> {}

export default function ComboboxItemGroup({
  className,
  children,
  ...props
}: ComboboxItemGroupProps) {
  const styles = combobox();

  return (
    <Ark.ItemGroup className={cn(styles.itemGroup(), className)} {...props}>
      {children}
    </Ark.ItemGroup>
  );
}
