import type React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "@75neo/themes";

export interface DrawerTitleProps extends React.ComponentProps<typeof Ark.Title> {}

export function DrawerTitle({ className, children, ...rest }: DrawerTitleProps) {
  return (
    <Ark.Title
      {...rest}
      data-slot="drawer-title"
      className={cn("text-base font-semibold text-highlighted", className)}
    >
      {children}
    </Ark.Title>
  );
}
