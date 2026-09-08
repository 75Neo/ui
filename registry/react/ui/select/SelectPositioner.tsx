import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

export interface SelectPositionerProps extends React.ComponentPropsWithRef<typeof Ark.Positioner> {}

export default function SelectPositioner({ className, children, ...props }: SelectPositionerProps) {
  const styles = select();

  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
