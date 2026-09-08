import React from "react";
import { Marquee as Ark } from "@ark-ui/react/marquee";
import { cn } from "cn";
import { marqueeStyles as styles } from "@/registry/shared/lib/marquee.styles";

export interface MarqueeContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function MarqueeContent({ className, children, ...props }: MarqueeContentProps) {
  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
