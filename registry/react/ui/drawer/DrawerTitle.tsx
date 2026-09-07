import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "cn";
import { drawer } from "@/registry/shared/lib/drawer.styles";

export interface DrawerTitleProps extends React.ComponentPropsWithRef<typeof Ark.Title> {}

export default function DrawerTitle({ className, children, ...props }: DrawerTitleProps) {
  const styles = drawer();

  return (
    <Ark.Title className={cn(styles.title(), className)} {...props}>
      {children}
    </Ark.Title>
  );
}
