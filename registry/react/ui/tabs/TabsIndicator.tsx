import React from "react";
import { Tabs as Ark } from "@ark-ui/react/tabs";
import { cn } from "cn";
import { tabs } from "@/registry/shared/lib/tabs.styles";

export interface TabsIndicatorProps extends React.ComponentPropsWithRef<typeof Ark.Indicator> {}

export default function TabsIndicator({ className, ...props }: TabsIndicatorProps) {
  const styles = tabs();

  return <Ark.Indicator className={cn(styles.indicator(), className)} {...props} />;
}
