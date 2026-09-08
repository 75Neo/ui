import React from "react";
import { Listbox as Ark } from "@ark-ui/react/listbox";
import { cn } from "cn";
import { listboxStyles as styles } from "@/registry/shared/lib/listbox.styles";

export interface ListboxItemIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemIndicator
> {}

export default function ListboxItemIndicator({
  className,
  children,
  ...props
}: ListboxItemIndicatorProps) {
  return (
    <Ark.ItemIndicator className={cn(styles.itemIndicator(), className)} {...props}>
      {children}
    </Ark.ItemIndicator>
  );
}
