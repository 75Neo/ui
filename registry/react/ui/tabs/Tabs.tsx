import React from "react";
import { Tabs as Ark } from "@ark-ui/react/tabs";
import { cn } from "cn";
import { tabs } from "@/registry/shared/lib/tabs.styles";

export interface TabsProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Tabs({ className, children, ...props }: TabsProps) {
  const styles = tabs();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
