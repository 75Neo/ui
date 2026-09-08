import React from "react";
import { Select as Ark } from "@ark-ui/react/select";
import { cn } from "cn";
import { select } from "@/registry/shared/lib/select.styles";

export interface SelectTriggerProps extends React.ComponentPropsWithRef<typeof Ark.Trigger> {}

export default function SelectTrigger({ className, children, ...props }: SelectTriggerProps) {
  const styles = select();

  return (
    <Ark.Trigger className={cn(styles.trigger(), className)} {...props}>
      {children}
    </Ark.Trigger>
  );
}
