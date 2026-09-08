import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { selectStyles as styles } from "@/registry/shared/lib/select.styles";

export interface SelectItemGroupLabelProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemGroupLabel
> {}

export default function SelectItemGroupLabel({
  className,
  children,
  ...props
}: SelectItemGroupLabelProps) {
  return (
    <Ark.ItemGroupLabel className={cn(styles.itemGroupLabel(), className)} {...props}>
      {children}
    </Ark.ItemGroupLabel>
  );
}
