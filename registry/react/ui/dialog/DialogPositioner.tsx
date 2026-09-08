import React from "react";
import { Dialog as Ark } from "@ark-ui/react/dialog";
import { cn } from "cn";
import { dialogStyles as styles } from "@/registry/shared/lib/dialog.styles";

export interface DialogPositionerProps extends React.ComponentPropsWithRef<typeof Ark.Positioner> {}

export default function DialogPositioner({ className, children, ...props }: DialogPositionerProps) {
  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
