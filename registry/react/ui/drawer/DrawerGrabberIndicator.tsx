import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "cn";
import { drawer } from "@/registry/shared/lib/drawer.styles";

export interface DrawerGrabberIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.GrabberIndicator
> {}

export default function DrawerGrabberIndicator({
  className,
  ...props
}: DrawerGrabberIndicatorProps) {
  const styles = drawer();

  return <Ark.GrabberIndicator className={cn(styles.grabberIndicator(), className)} {...props} />;
}
