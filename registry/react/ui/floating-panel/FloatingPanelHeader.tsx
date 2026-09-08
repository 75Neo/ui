import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanel } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelHeaderProps extends React.ComponentPropsWithRef<typeof Ark.Header> {}

export default function FloatingPanelHeader({
  className,
  children,
  ...props
}: FloatingPanelHeaderProps) {
  const styles = floatingPanel();

  return (
    <Ark.Header className={cn(styles.header(), className)} {...props}>
      {children}
    </Ark.Header>
  );
}
