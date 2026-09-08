import React from "react";
import { Collapsible as Ark } from "@ark-ui/react/collapsible";
import { cn } from "cn";
import { collapsibleStyles as styles } from "@/registry/shared/lib/collapsible.styles";

export interface CollapsibleTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function CollapsibleTrigger({
  className,
  children,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <Ark.Trigger className={cn(styles.trigger(), className)} {...props}>
      {children}
    </Ark.Trigger>
  );
}
