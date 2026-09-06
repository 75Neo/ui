import type React from "react";
import { Marquee as Ark } from "@ark-ui/react/marquee";
import { cn, type MarqueeEdgeProps as MarqueeEdgeContract } from "@75neo/themes";

export interface MarqueeEdgeProps
  extends Omit<React.ComponentProps<typeof Ark.Edge>, "side">, MarqueeEdgeContract {}

export function MarqueeEdge({ side, className, ...rest }: MarqueeEdgeProps) {
  return (
    <Ark.Edge
      {...rest}
      side={side}
      data-slot="marquee-edge"
      className={cn(
        "pointer-events-none z-10 data-[side=bottom]:h-[15%] data-[side=bottom]:[background:linear-gradient(to_top,var(--ui-bg),transparent)] data-[side=end]:w-[15%] data-[side=end]:[background:linear-gradient(to_left,var(--ui-bg),transparent)] data-[side=start]:w-[15%] data-[side=start]:[background:linear-gradient(to_right,var(--ui-bg),transparent)] data-[side=top]:h-[15%] data-[side=top]:[background:linear-gradient(to_bottom,var(--ui-bg),transparent)] rtl:data-[side=end]:[background:linear-gradient(to_right,var(--ui-bg),transparent)] rtl:data-[side=start]:[background:linear-gradient(to_left,var(--ui-bg),transparent)]",
        className,
      )}
    />
  );
}
