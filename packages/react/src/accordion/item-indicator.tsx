import type React from "react";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import { accordionDefaults, accordionSizeData, cn } from "@75neo/themes";
import { useAccordionVariants } from "./variants";

const accordionItemIndicator = cva(
  "ms-auto shrink-0 text-dimmed transition-transform duration-200 data-[state=open]:rotate-180 [&>svg]:size-full",
  {
    variants: { size: accordionSizeData.indicator },
    defaultVariants: accordionDefaults,
  },
);

export interface AccordionItemIndicatorProps extends React.ComponentProps<
  typeof Ark.ItemIndicator
> {}

export function AccordionItemIndicator({
  className,
  children,
  ...rest
}: AccordionItemIndicatorProps) {
  const variants = useAccordionVariants();

  return (
    <Ark.ItemIndicator
      {...rest}
      data-slot="accordion-item-indicator"
      className={cn(accordionItemIndicator(variants), className)}
    >
      {children ?? <ChevronDown />}
    </Ark.ItemIndicator>
  );
}
