import React from "react";
import { Marquee as Ark } from "@ark-ui/react/marquee";
import { cn } from "cn";
import { marqueeStyles as styles } from "@/registry/shared/lib/marquee.styles";

export interface MarqueeProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Marquee({ className, children, ...props }: MarqueeProps) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
