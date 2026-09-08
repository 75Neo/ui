import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

export interface SelectItemTextProps extends React.ComponentPropsWithRef<typeof Ark.ItemText> {}

export default function SelectItemText({ className, children, ...props }: SelectItemTextProps) {
  const styles = select();

  return (
    <Ark.ItemText className={cn(styles.itemText(), className)} {...props}>
      {children}
    </Ark.ItemText>
  );
}
