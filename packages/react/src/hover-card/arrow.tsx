import type React from "react";
import { HoverCard as Ark } from "@ark-ui/react/hover-card";
import { cn } from "@75neo/themes";

export interface HoverCardArrowProps extends React.ComponentProps<typeof Ark.Arrow> {}

export function HoverCardArrow({ className, children, ...rest }: HoverCardArrowProps) {
  return (
    <Ark.Arrow
      {...rest}
      data-slot="hover-card-arrow"
      className={cn("[--arrow-background:var(--ui-bg)] [--arrow-size:0.625rem]", className)}
    >
      {children ?? <Ark.ArrowTip data-slot="hover-card-arrow-tip" className={cn("")} />}
    </Ark.Arrow>
  );
}
