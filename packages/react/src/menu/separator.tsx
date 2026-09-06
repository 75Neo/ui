import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "@75neo/themes";

export interface MenuSeparatorProps extends React.ComponentProps<typeof Ark.Separator> {}

export function MenuSeparator({ className, ...rest }: MenuSeparatorProps) {
  return (
    <Ark.Separator
      {...rest}
      data-slot="menu-separator"
      className={cn("-mx-1 my-1 h-px border-0 bg-border", className)}
    />
  );
}
