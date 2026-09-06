import type React from "react";
import { Tabs as Ark } from "@ark-ui/react/tabs";
import { cva } from "class-variance-authority";
import { cn, tabsDefaults, tabsVariantData } from "@75neo/themes";
import { useTabsVariants } from "./variants";

const tabsList = cva(
  "relative isolate flex min-w-0 shrink-0 group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: { variant: tabsVariantData.list },
    defaultVariants: tabsDefaults,
  },
);

export interface TabsListProps extends React.ComponentProps<typeof Ark.List> {}

export function TabsList({ className, children, ...rest }: TabsListProps) {
  const variants = useTabsVariants();

  return (
    <Ark.List {...rest} data-slot="tabs-list" className={cn(tabsList(variants), className)}>
      {children}
    </Ark.List>
  );
}
