import React from "react";
import { Tooltip as Ark } from "@ark-ui/react/tooltip";
import { cn } from "cn";
import { tooltip } from "@/registry/shared/lib/tooltip.styles";

export interface TooltipContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function TooltipContent({ className, children, ...props }: TooltipContentProps) {
  const styles = tooltip();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
