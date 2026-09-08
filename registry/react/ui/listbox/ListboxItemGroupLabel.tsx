import React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

export interface ListboxItemGroupLabelProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemGroupLabel
> {}

export default function ListboxItemGroupLabel({
  className,
  children,
  ...props
}: ListboxItemGroupLabelProps) {
  const styles = listbox();

  return (
    <Ark.ItemGroupLabel className={cn(styles.itemGroupLabel(), className)} {...props}>
      {children}
    </Ark.ItemGroupLabel>
  );
}
