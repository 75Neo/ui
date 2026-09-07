import React from "react";
import { Collapsible as Ark } from "@ark-ui/react/collapsible";
import { cn } from "cn";
import { collapsible } from "@/registry/shared/lib/collapsible.styles";

export interface CollapsibleContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function CollapsibleContent({
  className,
  children,
  ...props
}: CollapsibleContentProps) {
  const styles = collapsible();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
