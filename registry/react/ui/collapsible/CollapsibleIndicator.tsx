import React from "react";
import { Collapsible as Ark } from "@ark-ui/react/collapsible";
import { cn } from "cn";
import { collapsible } from "@/registry/shared/lib/collapsible.styles";

export interface CollapsibleIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.Indicator
> {}

export default function CollapsibleIndicator({
  className,
  children,
  ...props
}: CollapsibleIndicatorProps) {
  const styles = collapsible();

  return (
    <Ark.Indicator className={cn(styles.indicator(), className)} {...props}>
      {children}
    </Ark.Indicator>
  );
}
