import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

export interface SelectItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function SelectItem({ className, children, ...props }: SelectItemProps) {
  const styles = select();

  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
