import type React from "react";
import { Switch as Ark } from "@ark-ui/react/switch";
import { cva } from "class-variance-authority";
import { cn, switchDefaults, switchSizeData } from "@75neo/themes";
import { useSwitchVariants } from "./variants";

const switchLabel = cva("block font-medium text-highlighted select-none", {
  variants: { size: switchSizeData.label },
  defaultVariants: switchDefaults,
});

export interface SwitchLabelProps extends React.ComponentProps<typeof Ark.Label> {}

export function SwitchLabel({ className, children, ...rest }: SwitchLabelProps) {
  const variants = useSwitchVariants();

  return (
    <Ark.Label {...rest} data-slot="switch-label" className={cn(switchLabel(variants), className)}>
      {children}
    </Ark.Label>
  );
}
