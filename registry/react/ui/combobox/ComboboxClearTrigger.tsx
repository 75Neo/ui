import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxClearTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ClearTrigger
> {}

export default function ComboboxClearTrigger({
  className,
  children,
  ...props
}: ComboboxClearTriggerProps) {
  const styles = combobox();

  return (
    <Ark.ClearTrigger className={cn(styles.clearTrigger(), className)} {...props}>
      {children}
    </Ark.ClearTrigger>
  );
}
