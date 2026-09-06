import type React from "react";
import { Menu as Ark } from "@ark-ui/react/menu";
import { cn } from "@75neo/themes";

export interface MenuArrowProps extends React.ComponentProps<typeof Ark.Arrow> {}

export function MenuArrow({ className, children, ...rest }: MenuArrowProps) {
  return (
    <Ark.Arrow
      {...rest}
      data-slot="menu-arrow"
      className={cn("[--arrow-background:var(--ui-bg)] [--arrow-size:0.625rem]", className)}
    >
      {children ?? <Ark.ArrowTip data-slot="menu-arrow-tip" className={cn("")} />}
    </Ark.Arrow>
  );
}
