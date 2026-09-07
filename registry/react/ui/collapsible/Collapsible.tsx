import React from "react";
import { Collapsible as Ark } from "@ark-ui/react/collapsible";
import { cn } from "cn";
import { collapsible } from "@/registry/shared/lib/collapsible.styles";

export interface CollapsibleProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Collapsible({ className, children, ...props }: CollapsibleProps) {
  const styles = collapsible();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
