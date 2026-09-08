import React from "react";
import { DateInput as Ark } from "@ark-ui/react/date-input";
import { cn } from "cn";
import { dateInput } from "@/registry/shared/lib/date-input.styles";

export interface DateInputProps extends React.ComponentPropsWithRef<typeof Ark.Root> {}

export default function DateInput({ className, children, ...props }: DateInputProps) {
  const styles = dateInput();

  return (
    <Ark.Root className={cn(styles.root(), className)} {...props}>
      {children}
    </Ark.Root>
  );
}
