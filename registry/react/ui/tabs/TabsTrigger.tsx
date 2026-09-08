import React from "react";
import { Tabs as Ark } from "@ark-ui/react/tabs";
import { cn } from "cn";
import { tabsStyles as styles } from "@/registry/shared/lib/tabs.styles";

export interface TabsTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function TabsTrigger({ className, children, ...props }: TabsTriggerProps) {
  return (
    <Ark.Trigger className={cn(styles.trigger(), className)} {...props}>
      {children}
    </Ark.Trigger>
  );
}
