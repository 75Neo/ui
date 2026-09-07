import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "cn";
import { drawer } from "@/registry/shared/lib/drawer.styles";

export interface DrawerContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function DrawerContent({ className, children, ...props }: DrawerContentProps) {
  const styles = drawer();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
