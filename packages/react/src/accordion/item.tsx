import type React from "react";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { cva } from "class-variance-authority";
import {
  accordionDefaults,
  accordionVariantData,
  cn,
  type AccordionItemProps as AccordionItemContract,
} from "@75neo/themes";
import { useAccordionVariants } from "./variants";

const accordionItem = cva(
  "min-w-0 [overflow-anchor:none] group-data-[orientation=horizontal]/accordion:flex",
  {
    variants: { variant: accordionVariantData.item },
    defaultVariants: accordionDefaults,
  },
);

export interface AccordionItemProps
  extends React.ComponentProps<typeof Ark.Item>, AccordionItemContract {}

export function AccordionItem({
  value,
  disabled,
  className,
  children,
  ...rest
}: AccordionItemProps) {
  const variants = useAccordionVariants();

  return (
    <Ark.Item
      {...rest}
      value={value}
      disabled={disabled}
      data-slot="accordion-item"
      className={cn(accordionItem(variants), className)}
    >
      {children}
    </Ark.Item>
  );
}
