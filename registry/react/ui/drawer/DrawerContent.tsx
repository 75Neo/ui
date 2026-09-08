import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "cn";
import { drawer, type DrawerSize } from "@/registry/shared/lib/drawer.styles";

export interface DrawerContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {
  size?: DrawerSize;
}

export default function DrawerContent({ size, className, children, ...props }: DrawerContentProps) {
  const styles = drawer({ size });

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
