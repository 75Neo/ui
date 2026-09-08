import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function ComboboxLabel({ className, children, ...props }: ComboboxLabelProps) {
  const styles = combobox();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
