import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function ComboboxItem({ className, children, ...props }: ComboboxItemProps) {
  const styles = combobox();

  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
