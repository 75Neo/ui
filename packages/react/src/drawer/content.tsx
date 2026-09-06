import type React from "react";
import { Drawer as Ark } from "@ark-ui/react/drawer";
import { cva } from "class-variance-authority";
import { Portal } from "@ark-ui/react/portal";
import {
  cn,
  drawerDefaults,
  drawerPanelCompoundData,
  drawerPlacementData,
  type DrawerContentProps as DrawerContentContract,
} from "@75neo/themes";
import { useDrawerVariants } from "./variants";

const drawerContent = cva(
  "relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-default shadow-2xl ring ring-accented outline-none",
  {
    variants: {
      placement: drawerPlacementData.base,
      size: {
        sm: "",
        md: "",
        lg: "",
        xl: "",
      },
      transition: {
        true: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
        false: "",
      },
    },
    compoundVariants: drawerPanelCompoundData,
    defaultVariants: drawerDefaults,
  },
);

export interface DrawerContentProps
  extends React.ComponentProps<typeof Ark.Content>, DrawerContentContract {
  /** Render the panel at the end of `body`. @defaultValue `true` */
  portal?: boolean;
  draggable?: boolean;
}

export function DrawerContent({
  transition,
  portal,
  draggable,
  className,
  children,
  ...rest
}: DrawerContentProps) {
  const variants = useDrawerVariants();
  const panel = (
    <Ark.Positioner
      data-slot="drawer-positioner"
      className={cn("fixed inset-0 flex", drawerPlacementData.positioner[variants.placement])}
    >
      <Ark.Content
        {...rest}
        draggable={draggable}
        data-slot="drawer-content"
        className={cn(drawerContent({ ...variants, transition }), className)}
      >
        {children}
      </Ark.Content>
    </Ark.Positioner>
  );

  if (portal ?? true) return <Portal>{panel}</Portal>;
  return panel;
}
