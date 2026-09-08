import React from "react";
import { Marquee as Ark } from "@ark-ui/react/marquee";
import { cn } from "cn";
import { marquee } from "@/registry/shared/lib/marquee.styles";

export interface MarqueeItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function MarqueeItem({ className, children, ...props }: MarqueeItemProps) {
  const styles = marquee();

  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
