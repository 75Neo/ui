import React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cn } from "cn";
import { popover } from "@/registry/shared/lib/popover.styles";

export interface PopoverTitleProps extends React.ComponentPropsWithRef<typeof Ark.Title> {}

export default function PopoverTitle({ className, children, ...props }: PopoverTitleProps) {
  const styles = popover();

  return (
    <Ark.Title className={cn(styles.title(), className)} {...props}>
      {children}
    </Ark.Title>
  );
}
