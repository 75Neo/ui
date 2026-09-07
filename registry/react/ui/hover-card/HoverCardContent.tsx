import React from "react";
import { HoverCard as Ark } from "@ark-ui/react/hover-card";
import { cn } from "cn";
import { hoverCard } from "@/registry/shared/lib/hover-card.styles";

export interface HoverCardContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function HoverCardContent({ className, children, ...props }: HoverCardContentProps) {
  const styles = hoverCard();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
