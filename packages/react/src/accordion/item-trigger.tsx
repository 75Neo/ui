import type React from "react";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { cva } from "class-variance-authority";
import {
  accordionDefaults,
  accordionSizeData,
  accordionVariantData,
  cn,
  type AccordionItemTriggerProps as AccordionItemTriggerContract,
} from "@75neo/themes";
import { useAccordionVariants } from "./variants";
import { AccordionItemIndicator } from "./item-indicator";

const accordionItemTrigger = cva(
  "flex w-full min-w-0 cursor-pointer items-center gap-2 text-start font-medium outline-primary/25 transition-colors select-none group-data-[orientation=horizontal]/accordion:h-full group-data-[orientation=horizontal]/accordion:w-auto group-data-[orientation=horizontal]/accordion:[writing-mode:vertical-rl] focus-visible:relative focus-visible:z-10 focus-visible:outline-3 focus-visible:-outline-offset-3 disabled:cursor-not-allowed disabled:opacity-75",
  {
    variants: {
      variant: accordionVariantData.trigger,
      size: accordionSizeData.trigger,
    },
    defaultVariants: accordionDefaults,
  },
);

export interface AccordionItemTriggerProps
  extends
    React.ComponentProps<typeof Ark.ItemTrigger>,
    AccordionItemTriggerContract<React.ReactNode> {}

export function AccordionItemTrigger({
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...rest
}: AccordionItemTriggerProps) {
  const variants = useAccordionVariants();

  return (
    // Ark has no header part, so the WAI-ARIA heading wrapper renders here,
    // inside the trigger file, and is never exported.
    <h3
      data-slot="accordion-header"
      className="flex min-w-0 group-data-[orientation=horizontal]/accordion:h-full group-data-[orientation=horizontal]/accordion:shrink-0"
    >
      <Ark.ItemTrigger
        {...rest}
        data-slot="accordion-item-trigger"
        className={cn(accordionItemTrigger(variants), className)}
      >
        {leadingIcon != null && (
          <span
            data-slot="accordion-leading-icon"
            className={cn(
              "shrink-0 text-dimmed [&>svg]:size-full",
              accordionSizeData.leadingIcon[variants.size],
            )}
          >
            {leadingIcon}
          </span>
        )}
        {children}
        <AccordionItemIndicator>{trailingIcon}</AccordionItemIndicator>
      </Ark.ItemTrigger>
    </h3>
  );
}
