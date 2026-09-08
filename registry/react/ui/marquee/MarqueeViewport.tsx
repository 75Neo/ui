import React from "react";
import { Marquee as Ark } from "@ark-ui/react/marquee";
import { cn } from "cn";
import { marqueeStyles as styles } from "@/registry/shared/lib/marquee.styles";

export interface MarqueeViewportProps extends React.ComponentPropsWithRef<typeof Ark.Viewport> {}

export default function MarqueeViewport({ className, children, ...props }: MarqueeViewportProps) {
  return (
    <Ark.Viewport className={cn(styles.viewport(), className)} {...props}>
      {children}
    </Ark.Viewport>
  );
}
