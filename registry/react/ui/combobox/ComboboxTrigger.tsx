import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function ComboboxTrigger({ className, children, ...props }: ComboboxTriggerProps) {
  const styles = combobox();

  return (
    <Ark.Trigger className={cn(styles.trigger(), className)} {...props}>
      {children}
    </Ark.Trigger>
  );
}
