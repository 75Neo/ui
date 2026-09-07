import React from "react";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { cn } from "cn";
import { accordion } from "@/registry/shared/lib/accordion.styles";

export interface AccordionItemProps extends React.ComponentPropsWithRef<typeof Ark.Item> {}

export default function AccordionItem({ className, children, ...props }: AccordionItemProps) {
  const styles = accordion();

  return (
    <Ark.Item className={cn(styles.item(), className)} {...props}>
      {children}
    </Ark.Item>
  );
}
