import React from "react";
import { FloatingPanel as Ark } from "@ark-ui/react/floating-panel";
import { cn } from "cn";
import { floatingPanelStyles as styles } from "@/registry/shared/lib/floating-panel.styles";

export interface FloatingPanelBodyProps extends React.ComponentPropsWithRef<typeof Ark.Body> {}

export default function FloatingPanelBody({
  className,
  children,
  ...props
}: FloatingPanelBodyProps) {
  return (
    <Ark.Body className={cn(styles.body(), className)} {...props}>
      {children}
    </Ark.Body>
  );
}
