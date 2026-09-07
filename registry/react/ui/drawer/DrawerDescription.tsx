import React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "cn";
import { drawer } from "@/registry/shared/lib/drawer.styles";

export interface DrawerDescriptionProps extends React.ComponentPropsWithRef<
  typeof Ark.Description
> {}

export default function DrawerDescription({
  className,
  children,
  ...props
}: DrawerDescriptionProps) {
  const styles = drawer();

  return (
    <Ark.Description className={cn(styles.description(), className)} {...props}>
      {children}
    </Ark.Description>
  );
}
