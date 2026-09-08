import React from "react";
import { HoverCard as Ark } from "@ark-ui/react/hover-card";
import { cn } from "cn";
import { hoverCardStyles as styles } from "@/registry/shared/lib/hover-card.styles";

export interface HoverCardArrowProps extends React.ComponentPropsWithRef<typeof Ark.Arrow> {}

export default function HoverCardArrow({ className, children, ...props }: HoverCardArrowProps) {
  return (
    <Ark.Arrow className={cn(styles.arrow(), className)} {...props}>
      {children}
    </Ark.Arrow>
  );
}
