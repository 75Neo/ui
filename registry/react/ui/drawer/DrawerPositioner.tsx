import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "cn";
import { drawer } from "@/registry/shared/lib/drawer.styles";

export interface DrawerPositionerProps extends React.ComponentPropsWithRef<typeof Ark.Positioner> {}

export default function DrawerPositioner({ className, children, ...props }: DrawerPositionerProps) {
  const styles = drawer();

  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
