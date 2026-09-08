import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { comboboxStyles as styles } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxPositionerProps extends React.ComponentPropsWithRef<
  typeof Ark.Positioner
> {}

export default function ComboboxPositioner({
  className,
  children,
  ...props
}: ComboboxPositionerProps) {
  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
