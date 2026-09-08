import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

export interface SelectItemIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemIndicator
> {}

export default function SelectItemIndicator({
  className,
  children,
  ...props
}: SelectItemIndicatorProps) {
  const styles = select();

  return (
    <Ark.ItemIndicator className={cn(styles.itemIndicator(), className)} {...props}>
      {children}
    </Ark.ItemIndicator>
  );
}
