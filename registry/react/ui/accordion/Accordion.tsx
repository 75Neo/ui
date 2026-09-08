import React from "react";
import { Accordion as Ark } from "@ark-ui/react/accordion";
import { cn } from "cn";
import { accordionStyles as styles } from "@/registry/shared/lib/accordion.styles";

export interface AccordionProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function Accordion({ className, children, ...props }: AccordionProps) {
  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
