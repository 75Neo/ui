import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "cn";
import { drawer } from "@/registry/shared/lib/drawer.styles";

export interface DrawerGrabberProps extends React.ComponentPropsWithRef<typeof Ark.Grabber> {}

export default function DrawerGrabber({ className, children, ...props }: DrawerGrabberProps) {
  const styles = drawer();

  return (
    <Ark.Grabber className={cn(styles.grabber(), className)} {...props}>
      {children}
    </Ark.Grabber>
  );
}
