import type React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "@75neo/themes";

export interface DrawerDescriptionProps extends React.ComponentProps<typeof Ark.Description> {}

export function DrawerDescription({ className, children, ...rest }: DrawerDescriptionProps) {
  return (
    <Ark.Description
      {...rest}
      data-slot="drawer-description"
      className={cn("text-sm/6 text-muted", className)}
    >
      {children}
    </Ark.Description>
  );
}
