import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "cn";
import { drawerStyles as styles } from "@/registry/shared/lib/drawer.styles";

export interface DrawerBackdropProps extends React.ComponentPropsWithRef<typeof Ark.Backdrop> {}

export default function DrawerBackdrop({ className, ...props }: DrawerBackdropProps) {
  return <Ark.Backdrop className={cn(styles.backdrop(), className)} {...props} />;
}
