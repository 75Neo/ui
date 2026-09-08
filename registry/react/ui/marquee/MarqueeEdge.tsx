import React from "react";
import { Marquee as Ark } from "@ark-ui/react/marquee";
import { cn } from "cn";
import { marqueeStyles as styles } from "@/registry/shared/lib/marquee.styles";

export interface MarqueeEdgeProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Edge>,
  "children"
> {}

export default function MarqueeEdge({ className, ...props }: MarqueeEdgeProps) {
  return <Ark.Edge className={cn(styles.edge(), className)} {...props} />;
}
