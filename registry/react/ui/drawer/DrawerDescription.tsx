import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "cn";
import { drawerStyles as styles } from "@/registry/shared/lib/drawer.styles";

export interface DrawerDescriptionProps extends React.ComponentPropsWithRef<
  typeof Ark.Description
> {}

export default function DrawerDescription({
  className,
  children,
  ...props
}: DrawerDescriptionProps) {
  return (
    <Ark.Description className={cn(styles.description(), className)} {...props}>
      {children}
    </Ark.Description>
  );
}
