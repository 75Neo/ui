import React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

export interface ListboxLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function ListboxLabel({ className, children, ...props }: ListboxLabelProps) {
  const styles = listbox();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
