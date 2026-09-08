import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function ComboboxControl({ className, children, ...props }: ComboboxControlProps) {
  const styles = combobox();

  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
