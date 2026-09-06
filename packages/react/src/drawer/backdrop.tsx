import type React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cn } from "@75neo/themes";

export interface DrawerBackdropProps extends React.ComponentProps<typeof Ark.Backdrop> {
  /** @defaultValue `true` */
  transition?: boolean;
}

export function DrawerBackdrop({ transition, className, ...rest }: DrawerBackdropProps) {
  return (
    <Ark.Backdrop
      {...rest}
      data-slot="drawer-backdrop"
      className={cn(
        "fixed inset-0 bg-inverted/40 backdrop-blur-[2px]",
        (transition ?? true)
          ? "data-[state=closed]:animate-overlay-out data-[state=open]:animate-overlay-in"
          : "",
        className,
      )}
    />
  );
}
