import React from "react";
import { HoverCard as Ark } from "@ark-ui/react/hover-card";
import { cn } from "cn";
import { hoverCardStyles as styles } from "@/registry/shared/lib/hover-card.styles";

export interface HoverCardArrowTipProps extends React.ComponentPropsWithRef<typeof Ark.ArrowTip> {}

export default function HoverCardArrowTip({ className, ...props }: HoverCardArrowTipProps) {
  return <Ark.ArrowTip className={cn(styles.arrowTip(), className)} {...props} />;
}
