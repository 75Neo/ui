import React from "react";
import { DateInput as Ark } from "@ark-ui/react/date-input";
import { cn } from "cn";
import { dateInput } from "@/registry/shared/lib/date-input.styles";

export interface DateInputLabelProps extends React.ComponentPropsWithRef<typeof Ark.Label> {}

export default function DateInputLabel({ className, children, ...props }: DateInputLabelProps) {
  const styles = dateInput();

  return (
    <Ark.Label className={cn(styles.label(), className)} {...props}>
      {children}
    </Ark.Label>
  );
}
