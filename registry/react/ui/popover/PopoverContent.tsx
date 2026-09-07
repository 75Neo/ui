import React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cn } from "cn";
import { popover } from "@/registry/shared/lib/popover.styles";

export interface PopoverContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function PopoverContent({ className, children, ...props }: PopoverContentProps) {
  const styles = popover();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
