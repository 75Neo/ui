import React from "react";
import { DateInput as Ark } from "@ark-ui/react/date-input";
import { cn } from "cn";
import { dateInputStyles as styles } from "@/registry/shared/lib/date-input.styles";

export interface DateInputControlProps extends React.ComponentPropsWithRef<typeof Ark.Control> {}

export default function DateInputControl({ className, children, ...props }: DateInputControlProps) {
  return (
    <Ark.Control className={cn(styles.control(), className)} {...props}>
      {children}
    </Ark.Control>
  );
}
