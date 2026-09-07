import React from "react";
import { Tabs as Ark } from "@ark-ui/react/tabs";
import { cn } from "cn";
import { tabs } from "@/registry/shared/lib/tabs.styles";

export interface TabsContentProps extends React.ComponentPropsWithRef<typeof Ark.Content> {}

export default function TabsContent({ className, children, ...props }: TabsContentProps) {
  const styles = tabs();

  return (
    <Ark.Content className={cn(styles.content(), className)} {...props}>
      {children}
    </Ark.Content>
  );
}
