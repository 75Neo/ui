import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "cn";
import { drawerStyles as styles } from "@/registry/shared/lib/drawer.styles";

export interface DrawerGrabberIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.GrabberIndicator
> {}

export default function DrawerGrabberIndicator({
  className,
  ...props
}: DrawerGrabberIndicatorProps) {
  return <Ark.GrabberIndicator className={cn(styles.grabberIndicator(), className)} {...props} />;
}
