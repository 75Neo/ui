import type React from "react";
import { Collapsible as Ark } from "@ark-ui/react/collapsible";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { cn, collapsibleDefaults, collapsibleSizeData } from "@75neo/themes";
import { useCollapsibleVariants } from "./variants";

const collapsibleIndicator = cva(
  "ms-auto shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-180 [&>svg]:size-full",
  {
    variants: { size: collapsibleSizeData.indicator },
    defaultVariants: collapsibleDefaults,
  },
);

export interface CollapsibleIndicatorProps extends React.ComponentProps<typeof Ark.Indicator> {}

export function CollapsibleIndicator({ className, children, ...rest }: CollapsibleIndicatorProps) {
  const variants = useCollapsibleVariants();

  return (
    <Ark.Indicator
      {...rest}
      data-slot="collapsible-indicator"
      className={cn(collapsibleIndicator(variants), className)}
    >
      {children ?? <ChevronDown />}
    </Ark.Indicator>
  );
}
