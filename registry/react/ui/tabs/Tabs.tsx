import React from "react";
import { Tabs as Ark } from "@ark-ui/react/tabs";
import { cn } from "cn";
import { tabs, type Intent } from "@/registry/shared/lib/tabs.styles";

export interface TabsProps extends Omit<React.ComponentPropsWithRef<typeof Ark.Root>, "color"> {
  color?: Intent;
}

export default function Tabs({ color, className, children, ...props }: TabsProps) {
  const styles = tabs({ color });

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
