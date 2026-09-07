import React from "react";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { cn } from "cn";
import { accordion } from "@/registry/shared/lib/accordion.styles";

export interface AccordionItemContentProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemContent
> {}

export default function AccordionItemContent({
  className,
  children,
  ...props
}: AccordionItemContentProps) {
  const styles = accordion();

  return (
    <Ark.ItemContent className={cn(styles.itemContent(), className)} {...props}>
      {children}
    </Ark.ItemContent>
  );
}
