import React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cn } from "cn";
import { popover } from "@/registry/shared/lib/popover.styles";

export interface PopoverDescriptionProps extends React.ComponentPropsWithRef<
  typeof Ark.Description
> {}

export default function PopoverDescription({
  className,
  children,
  ...props
}: PopoverDescriptionProps) {
  const styles = popover();

  return (
    <Ark.Description className={cn(styles.description(), className)} {...props}>
      {children}
    </Ark.Description>
  );
}
