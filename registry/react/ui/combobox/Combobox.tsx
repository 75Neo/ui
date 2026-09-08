import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Combobox({ className, children, ...props }: ComboboxProps) {
  const styles = combobox();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
