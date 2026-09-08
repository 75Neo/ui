import React from "react";
import { Marquee as Ark } from "@ark-ui/react/marquee";
import { cn } from "cn";
import { marqueeStyles as styles } from "@/registry/shared/lib/marquee.styles";

export interface MarqueeItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function MarqueeItem({ className, children, ...props }: MarqueeItemProps) {
  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
