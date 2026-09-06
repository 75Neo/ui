import type React from "react";
import { Collapsible as Ark } from "@ark-ui/react/collapsible";
import { cva } from "class-variance-authority";
import {
  cn,
  collapsibleDefaults,
  collapsibleSizeData,
  collapsibleVariantData,
  type CollapsibleTriggerProps as CollapsibleTriggerContract,
} from "@75neo/themes";
import { useCollapsibleVariants } from "./variants";
import { CollapsibleIndicator } from "./indicator";

const collapsibleTrigger = cva(
  "flex w-full min-w-0 cursor-pointer items-center gap-2 text-start font-medium outline-primary/25 transition-colors select-none focus-visible:relative focus-visible:z-10 focus-visible:outline-3 focus-visible:-outline-offset-3 data-disabled:cursor-not-allowed data-disabled:opacity-75",
  {
    variants: {
      variant: collapsibleVariantData.trigger,
      size: collapsibleSizeData.trigger,
    },
    defaultVariants: collapsibleDefaults,
  },
);

export interface CollapsibleTriggerProps
  extends React.ComponentProps<typeof Ark.Trigger>, CollapsibleTriggerContract<React.ReactNode> {}

export function CollapsibleTrigger({
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...rest
}: CollapsibleTriggerProps) {
  const variants = useCollapsibleVariants();

  return (
    <Ark.Trigger
      {...rest}
      data-slot="collapsible-trigger"
      className={cn(collapsibleTrigger(variants), className)}
    >
      {leadingIcon != null && (
        <span
          data-slot="collapsible-leading-icon"
          className={cn(
            "shrink-0 text-dimmed [&>svg]:size-full",
            collapsibleSizeData.leadingIcon[variants.size],
          )}
        >
          {leadingIcon}
        </span>
      )}
      <span data-slot="collapsible-label" className="min-w-0 flex-1 truncate">
        {children}
      </span>
      <CollapsibleIndicator>{trailingIcon}</CollapsibleIndicator>
    </Ark.Trigger>
  );
}
