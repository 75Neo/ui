import type React from "react";
import { Collapsible as Ark } from "@ark-ui/react/collapsible";
import { cva } from "class-variance-authority";
import {
  cn,
  collapsibleDefaults,
  collapsibleSizeData,
  collapsibleVariantData,
} from "@75neo/themes";
import { useCollapsibleVariants } from "./variants";

const collapsibleContent = cva("overflow-hidden", {
  variants: { variant: collapsibleVariantData.content },
  defaultVariants: collapsibleDefaults,
});

export interface CollapsibleContentProps extends React.ComponentProps<typeof Ark.Content> {}

export function CollapsibleContent({ className, children, ...rest }: CollapsibleContentProps) {
  const variants = useCollapsibleVariants();

  return (
    <Ark.Content
      {...rest}
      data-slot="collapsible-content"
      className={cn(collapsibleContent(variants), className)}
    >
      <div
        data-slot="collapsible-body"
        className={cn("min-w-0 text-pretty text-toned", collapsibleSizeData.body[variants.size])}
      >
        {children}
      </div>
    </Ark.Content>
  );
}
