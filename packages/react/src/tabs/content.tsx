import type React from "react";
import { Tabs as Ark } from "@ark-ui/react/tabs";
import { cva } from "class-variance-authority";
import {
  cn,
  tabsDefaults,
  tabsSizeData,
  type TabsContentProps as TabsContentContract,
} from "@75neo/themes";
import { useTabsVariants } from "./variants";

const tabsContent = cva("min-w-0 outline-none", {
  variants: { size: tabsSizeData.content },
  defaultVariants: tabsDefaults,
});

export interface TabsContentProps
  extends
    Omit<React.ComponentProps<typeof Ark.Content>, "value" | "children">,
    TabsContentContract {
  children?: React.ReactNode;
}

export function TabsContent({ value, className, children, ...rest }: TabsContentProps) {
  const variants = useTabsVariants();

  return (
    <Ark.Content
      {...rest}
      value={value}
      data-slot="tabs-content"
      className={cn(tabsContent(variants), className)}
    >
      {children}
    </Ark.Content>
  );
}
