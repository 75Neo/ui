import React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "cn";
import { menu } from "@/registry/shared/lib/menu.styles";

export interface MenuPositionerProps extends React.ComponentPropsWithRef<typeof Ark.Positioner> {}

export default function MenuPositioner({ className, children, ...props }: MenuPositionerProps) {
  const styles = menu();

  return (
    <Ark.Positioner className={cn(styles.positioner(), className)} {...props}>
      {children}
    </Ark.Positioner>
  );
}
