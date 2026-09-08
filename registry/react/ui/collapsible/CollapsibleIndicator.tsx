import React from "react";
import { Collapsible as Ark } from "@ark-ui/react/collapsible";
import { cn } from "cn";
import { collapsibleStyles as styles } from "@/registry/shared/lib/collapsible.styles";

export interface CollapsibleIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.Indicator
> {}

export default function CollapsibleIndicator({
  className,
  children,
  ...props
}: CollapsibleIndicatorProps) {
  return (
    <Ark.Indicator className={cn(styles.indicator(), className)} {...props}>
      {children}
    </Ark.Indicator>
  );
}
