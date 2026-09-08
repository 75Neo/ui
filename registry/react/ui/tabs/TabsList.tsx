import React from "react";
import { Tabs as Ark } from "@ark-ui/react/tabs";
import { cn } from "cn";
import { tabsStyles as styles } from "@/registry/shared/lib/tabs.styles";

export interface TabsListProps extends React.ComponentPropsWithRef<typeof Ark.List> {}

export default function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <Ark.List className={cn(styles.list(), className)} {...props}>
      {children}
    </Ark.List>
  );
}
