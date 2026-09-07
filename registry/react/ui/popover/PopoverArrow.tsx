import React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cn } from "cn";
import { popover } from "@/registry/shared/lib/popover.styles";

export interface PopoverArrowProps extends React.ComponentPropsWithRef<typeof Ark.Arrow> {}

export default function PopoverArrow({ className, children, ...props }: PopoverArrowProps) {
  const styles = popover();

  return (
    <Ark.Arrow className={cn(styles.arrow(), className)} {...props}>
      {children}
    </Ark.Arrow>
  );
}
