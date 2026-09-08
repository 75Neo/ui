import React from "react";
import { Marquee as Ark } from "@ark-ui/react/marquee";
import { cn } from "cn";
import { marquee } from "@/registry/shared/lib/marquee.styles";

export interface MarqueeEdgeProps extends Omit<
  React.ComponentPropsWithRef<typeof Ark.Edge>,
  "children"
> {}

export default function MarqueeEdge({ className, ...props }: MarqueeEdgeProps) {
  const styles = marquee();

  return <Ark.Edge className={cn(styles.edge(), className)} {...props} />;
}
