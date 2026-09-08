import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanelStyles as styles } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelControlProps extends React.ComponentPropsWithRef<
  typeof Ark.Control
> {}

export default function FloatingPanelControl({
  className,
  children,
  ...props
}: FloatingPanelControlProps) {
  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
