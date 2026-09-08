import React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cn } from "cn";
import { popoverStyles as styles } from "@/registry/shared/lib/popover.styles";

export interface PopoverArrowProps extends React.ComponentPropsWithRef<typeof Ark.Arrow> {}

export default function PopoverArrow({ className, children, ...props }: PopoverArrowProps) {
  return (
    <Ark.Arrow className={cn(styles.arrow(), className)} {...props}>
      {children}
    </Ark.Arrow>
  );
}
