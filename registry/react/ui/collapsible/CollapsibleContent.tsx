import React from "react";
import { Collapsible as Ark } from "@ark-ui/react/collapsible";
import { cn } from "cn";
import { collapsibleStyles as styles } from "@/registry/shared/lib/collapsible.styles";

export interface CollapsibleContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function CollapsibleContent({
  className,
  children,
  ...props
}: CollapsibleContentProps) {
  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
