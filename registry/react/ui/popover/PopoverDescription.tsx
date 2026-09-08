import React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cn } from "cn";
import { popoverStyles as styles } from "@/registry/shared/lib/popover.styles";

export interface PopoverDescriptionProps extends React.ComponentPropsWithRef<
  typeof Ark.Description
> {}

export default function PopoverDescription({
  className,
  children,
  ...props
}: PopoverDescriptionProps) {
  return (
    <Ark.Description className={cn(styles.description(), className)} {...props}>
      {children}
    </Ark.Description>
  );
}
