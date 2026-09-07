import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "cn";
import { drawer } from "@/registry/shared/lib/drawer.styles";

export interface DrawerCloseTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.CloseTrigger
> {}

export default function DrawerCloseTrigger({
  className,
  children,
  ...props
}: DrawerCloseTriggerProps) {
  const styles = drawer();

  return (
    <Ark.CloseTrigger className={cn(styles.closeTrigger(), className)} {...props}>
      {children}
    </Ark.CloseTrigger>
  );
}
