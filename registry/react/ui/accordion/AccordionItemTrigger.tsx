import React from "react";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { cn } from "cn";
import { accordion } from "@/registry/shared/lib/accordion.styles";

export interface AccordionItemTriggerProps extends React.ComponentPropsWithRef<
  typeof Ark.ItemTrigger
> {}

export default function AccordionItemTrigger({
  className,
  children,
  ...props
}: AccordionItemTriggerProps) {
  const styles = accordion();

  return (
    <Ark.ItemTrigger className={cn(styles.itemTrigger(), className)} {...props}>
      {children}
    </Ark.ItemTrigger>
  );
}
