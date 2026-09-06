import type React from "react";
import { Tabs as Ark } from "@ark-ui/react/tabs";
import { cva } from "class-variance-authority";
import {
  cn,
  tabsDefaults,
  tabsSizeData,
  tabsTriggerCompoundData,
  tabsVariantData,
  type TabsTriggerProps as TabsTriggerContract,
} from "@75neo/themes";
import { useTabsVariants } from "./variants";

const tabsTrigger = cva(
  "inline-flex min-w-0 cursor-pointer items-center gap-2 font-medium whitespace-nowrap transition-colors select-none group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:outline-3 disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: {
      variant: tabsVariantData.trigger,
      color: {
        primary: "",
        secondary: "",
        success: "",
        info: "",
        warning: "",
        error: "",
        neutral: "",
      },
      size: tabsSizeData.trigger,
    },
    compoundVariants: tabsTriggerCompoundData,
    defaultVariants: tabsDefaults,
  },
);

export interface TabsTriggerProps
  extends
    Omit<React.ComponentProps<typeof Ark.Trigger>, "value" | "children">,
    TabsTriggerContract {
  children?: React.ReactNode;
}

export function TabsTrigger({ value, disabled, className, children, ...rest }: TabsTriggerProps) {
  const variants = useTabsVariants();

  return (
    <Ark.Trigger
      {...rest}
      value={value}
      disabled={disabled}
      data-slot="tabs-trigger"
      className={cn(tabsTrigger(variants), className)}
    >
      {children}
    </Ark.Trigger>
  );
}
