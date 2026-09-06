import type React from "react";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { accordionSizeData, cn } from "@75neo/themes";
import { useAccordionVariants } from "./variants";

export interface AccordionItemContentProps extends React.ComponentProps<typeof Ark.ItemContent> {}

export function AccordionItemContent({ className, children, ...rest }: AccordionItemContentProps) {
  const variants = useAccordionVariants();

  return (
    <Ark.ItemContent
      {...rest}
      data-slot="accordion-item-content"
      className={cn(
        "overflow-hidden group-data-[orientation=horizontal]/accordion:h-full",
        className,
      )}
    >
      <div
        data-slot="accordion-body"
        className={cn(
          "min-w-0 text-pretty text-toned group-data-[orientation=horizontal]/accordion:w-max group-data-[orientation=horizontal]/accordion:max-w-sm",
          accordionSizeData.body[variants.size],
        )}
      >
        {children}
      </div>
    </Ark.ItemContent>
  );
}
