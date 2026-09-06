import type React from "react";
import { Marquee as Ark } from "@ark-ui/react/marquee";
import { cn } from "@75neo/themes";

export interface MarqueeViewportProps extends React.ComponentProps<typeof Ark.Viewport> {}

export function MarqueeViewport({ className, children, ...rest }: MarqueeViewportProps) {
  return (
    <Ark.Viewport {...rest} data-slot="marquee-viewport" className={cn("size-full", className)}>
      {children}
    </Ark.Viewport>
  );
}
