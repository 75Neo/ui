import React from "react";
import { Combobox as Ark } from "@ark-ui/react/combobox";
import { cn } from "cn";
import { comboboxStyles as styles } from "@/registry/shared/lib/combobox.styles";

export interface ComboboxEmptyProps extends React.ComponentPropsWithRef<typeof Ark.Empty> {}

export default function ComboboxEmpty({ className, children, ...props }: ComboboxEmptyProps) {
  return (
    <Ark.Empty className={cn(styles.empty(), className)} {...props}>
      {children}
    </Ark.Empty>
  );
}
