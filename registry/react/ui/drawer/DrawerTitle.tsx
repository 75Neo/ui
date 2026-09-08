import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "cn";
import { drawerStyles as styles } from "@/registry/shared/lib/drawer.styles";

export interface DrawerTitleProps extends React.ComponentPropsWithRef<typeof Ark.Title> {}

export default function DrawerTitle({ className, children, ...props }: DrawerTitleProps) {
  return (
    <Ark.Title className={cn(styles.title(), className)} {...props}>
      {children}
    </Ark.Title>
  );
}
