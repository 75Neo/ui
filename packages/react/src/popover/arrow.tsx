import type React from "react";
import { Popover as Ark } from "@ark-ui/react/popover";
import { cn } from "@75neo/themes";

export interface PopoverArrowProps extends React.ComponentProps<typeof Ark.Arrow> {}

export function PopoverArrow({ className, children, ...rest }: PopoverArrowProps) {
  return (
    <Ark.Arrow
      {...rest}
      data-slot="popover-arrow"
      className={cn("[--arrow-background:var(--ui-bg)] [--arrow-size:0.625rem]", className)}
    >
      {children ?? <Ark.ArrowTip data-slot="popover-arrow-tip" className={cn("")} />}
    </Ark.Arrow>
  );
}
