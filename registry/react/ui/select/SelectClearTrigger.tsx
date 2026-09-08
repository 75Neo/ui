import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

export interface SelectClearTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ClearTrigger
> {}

export default function SelectClearTrigger({
  className,
  children,
  ...props
}: SelectClearTriggerProps) {
  const styles = select();

  return (
    <Ark.ClearTrigger className={cn(styles.clearTrigger(), className)} {...props}>
      {children}
    </Ark.ClearTrigger>
  );
}
