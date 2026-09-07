import React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cn } from "cn";
import { popover } from "@/registry/shared/lib/popover.styles";

export interface PopoverCloseTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.CloseTrigger
> {}

export default function PopoverCloseTrigger({
  className,
  children,
  ...props
}: PopoverCloseTriggerProps) {
  const styles = popover();

  return (
    <Ark.CloseTrigger className={cn(styles.closeTrigger(), className)} {...props}>
      {children}
    </Ark.CloseTrigger>
  );
}
