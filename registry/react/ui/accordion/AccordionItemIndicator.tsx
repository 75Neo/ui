import React from "react";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { cn } from "cn";
import { accordion } from "@/registry/shared/lib/accordion.styles";

export interface AccordionItemIndicatorProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemIndicator
> {}

export default function AccordionItemIndicator({
  className,
  children,
  ...props
}: AccordionItemIndicatorProps) {
  const styles = accordion();

  return (
    <Ark.ItemIndicator className={cn(styles.itemIndicator(), className)} {...props}>
      {children}
    </Ark.ItemIndicator>
  );
}
