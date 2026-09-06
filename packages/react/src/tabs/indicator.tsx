import type React from "react";
import { Tabs as Ark } from "@ark-ui/react/tabs";
import { cva } from "class-variance-authority";
import { cn, tabsDefaults, tabsIndicatorCompoundData, tabsVariantData } from "@75neo/themes";
import { useTabsVariants } from "./variants";

const tabsIndicator = cva("absolute -z-10", {
  variants: {
    variant: tabsVariantData.indicator,
    color: {
      primary: "",
      secondary: "",
      success: "",
      info: "",
      warning: "",
      error: "",
      neutral: "",
    },
  },
  compoundVariants: tabsIndicatorCompoundData,
  defaultVariants: tabsDefaults,
});

export interface TabsIndicatorProps extends React.ComponentProps<typeof Ark.Indicator> {}

export function TabsIndicator({ className, ...rest }: TabsIndicatorProps) {
  const variants = useTabsVariants();

  return (
    <Ark.Indicator
      {...rest}
      data-slot="tabs-indicator"
      className={cn(tabsIndicator(variants), className)}
    />
  );
}
