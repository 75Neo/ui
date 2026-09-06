import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cva } from "class-variance-authority";
import { Portal } from "@ark-ui/react/portal";
import {
  cn,
  menuDefaults,
  menuSizeData,
  type MenuContentProps as MenuContentContract,
} from "@75neo/themes";
import { useMenuVariants } from "./variants";

const menuContent = cva(
  "relative flex max-h-(--available-height) min-w-40 origin-(--transform-origin) flex-col overflow-y-auto overscroll-contain rounded-md bg-default shadow-lg ring ring-accented outline-none",
  {
    variants: {
      size: menuSizeData.base,
      transition: {
        true: "data-[state=closed]:animate-panel-out data-[state=open]:animate-panel-in",
        false: "",
      },
    },
    defaultVariants: { ...menuDefaults, transition: true },
  },
);

export interface MenuContentProps
  extends React.ComponentProps<typeof Ark.Content>, MenuContentContract {
  /** Render the panel at the end of `body`. @defaultValue `true` */
  portal?: boolean;
}

export function MenuContent({
  transition,
  portal,
  className,
  children,
  ...rest
}: MenuContentProps) {
  const variants = useMenuVariants();
  const panel = (
    <Ark.Positioner data-slot="menu-positioner" className="z-50">
      <Ark.Content
        {...rest}
        data-slot="menu-content"
        className={cn(menuContent({ ...variants, transition }), className)}
      >
        {children}
      </Ark.Content>
    </Ark.Positioner>
  );

  if (portal ?? true) return <Portal>{panel}</Portal>;
  return panel;
}
